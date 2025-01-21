const forceDatabaseRefresh = false;

import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import routes from './routes/index.js';
import { sequelize } from './models/index.js';
import path from 'path';
import { fileURLToPath } from 'url';


const app = express();
const PORT = process.env.PORT || 3001;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Serves static files in the entire client's dist folder
const staticPath = path.resolve(__dirname, '../../client/dist');
console.log('Static path:', staticPath);
app.use(express.static(staticPath));

app.use(express.json());
app.use(routes);

// Catch all route that serves the index.html
app.get('*', (_req, res) => {
  res.sendFile(path.resolve(staticPath, 'index.html'));
});

// Sync database and start server
sequelize.sync({ force: forceDatabaseRefresh }).then(() => {
  const server = app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
  });

  server.on('error', (err: NodeJS.ErrnoException) => {
    if (err.code === 'EADDRINUSE') {
      console.error(`Port ${PORT} is already in use. Please use a different port.`);
    } else {
      console.error('Server error:', err);
    }
    process.exit(1); // Exit the process to avoid a hanging server
  });
});
