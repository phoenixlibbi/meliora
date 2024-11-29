# Folder Structure

```md
/backend
  ├── /api-server.js         // API server for handling JWT authentication and API routes
  ├── /controllers           // Folder to hold your route controllers (business logic)
  ├── /db.js                 // Database connection
  ├── /models                // Folder to hold your database models
  ├── /middlewares           // Middleware functions like authentication, logging, etc.
  ├── /public                // Static files, such as images
  ├── /routers               // Folder for API route handlers
  ├── /seeder.js             // Seeder file for populating the database (optional)
  ├── /server.js             // Main server for serving React app and static files
  ├── /node_modules          // Node.js modules
  ├── /package.json          // Project dependencies and scripts
  └── /package-lock.json     // Lock file for npm
```