const forceDatabaseRefresh = false;

import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import routes from './routes/index.js';
import { sequelize } from './models/index.js';
import path from 'path';
import { fileURLToPath } from 'url';


const app = express();
const PORT = process.env.PORT || 3000;

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
sequelize.sync({force: forceDatabaseRefresh}).then(() => {
  app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
  });
});
