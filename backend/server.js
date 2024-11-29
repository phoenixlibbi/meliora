require('dotenv').config();
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const helmet = require('helmet');
const path = require('path');
const { auth } = require('express-oauth2-jwt-bearer');
const authConfig = require('./auth_config.json'); 
const connection = require('./db');
const router = require('./routers/router');

const app = express();
const port = process.env.PORT || 3001;
const appPort = process.env.SERVER_PORT || 3000;
const appOrigin = authConfig.appOrigin || `http://localhost:${appPort}`;

app.use(cors({ origin: appOrigin }));
app.use(express.json());
app.use(morgan('dev'));
app.use(
  helmet({
    contentSecurityPolicy: false,
  })
);

// JWT Authentication Middleware (for API routes)
const checkJwt = auth({
  audience: authConfig.audience,
  issuerBaseURL: `https://${authConfig.domain}/`,
  algorithms: ['RS256'],
});

// Public routes (no JWT needed)
app.use('/', router);

// Protected API route (JWT needed)
app.get('/api/external', checkJwt, (req, res) => {
  res.send({
    msg: 'Your access token was successfully validated!',
  });
});

app.use(express.static(path.join(__dirname, 'build')));
app.use('/images', (req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
  next();
}, express.static(path.join(__dirname, 'public/images')));

connection().then(() => {
  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
});

module.exports = app;