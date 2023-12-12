// server.ts
import express from 'express';
import { env } from './env'
const app = express();


// Serve static files from 'public' directory
app.use(express.static('public'));

// Start the server
app.listen(env.PORT, () => {
  console.log(`http://localhost:${env.PORT}/`);
});