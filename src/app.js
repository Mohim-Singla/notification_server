/* eslint-disable import/first */
// eslint-disable-next-line import/newline-after-import
import { serviceConfig } from './config/index.js';
serviceConfig;
import http from 'http';
import express from 'express';
import cors from 'cors';
import { routeMap } from './route/index.js';
import { responseHandler } from './middleware/responseHandler.js';
import { debugLogger } from './middleware/debug.js';
import { mongoConnection } from './db/mongo/connection/index.js';
import { mysqlConnection } from './db/mysql/connection/index.js';
import { sendgrid } from './integrations/sendgrid/index.js';
import { sqsClient } from './sqs/client/index.js';

const app = express();
const server = http.createServer(app);
const PORT = process.env.PORT || 3000;

/**
 * Main application entry point. Initializes connections and starts the server.
 */
async function main() {
  try {
    app.use(cors({
      origin: 'http://localhost:3000',
      methods: ['GET', 'POST', 'PUT', 'DELETE'],
      allowedHeaders: ['Content-Type', 'Authorization'],
    }));
    app.use(express.json({ limit: '60mb', extended: true }));
    app.use(express.urlencoded({ extended: true }));
    app.use(debugLogger);
    app.use(responseHandler);

    // Initialize database connections
    await Promise.all([
      mongoConnection.init(),
      mysqlConnection.init(),
    ]);

    // Initialize SQS Consumer
    sqsClient.initConsumer();

    // Initialize integrations
    await Promise.all([
      sendgrid.init(),
    ]);

    app.get('/ping', (req, res) => {
      return res.success('Server is working fine.', { timestamp: Date.now() });
    });

    app.use('/notification-server', routeMap);

    server.listen(PORT, (error) => {
      if (error) {
        throw error;
      }
      console.info('App is listening on PORT:', PORT);
    });
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
}

main();
