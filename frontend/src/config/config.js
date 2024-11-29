import authConfig from '../auth_config.json';

export const getConfig = () => ({
  apiOrigin: process.env.REACT_APP_API_ORIGIN || "http://localhost:3001",
  audience: process.env.REACT_APP_AUTH0_AUDIENCE || authConfig.audience,
});
