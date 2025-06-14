import { server } from 'app';
import mongoose from 'mongoose';
import config from '@config/config';
import logger from '@config/logger';

mongoose.connect(config.databaseUri).then(() => {
  logger.info('Connected to MongoDB');
});

const exitHandler = () => {
  if (server) {
    server.close(() => {
      logger.info('Server closed');
      process.exit(0);
    });
  } else {
    process.exit(0);
  }
};
const unexpectedErrorHandler = (error: Error) => {
  logger.error(error);
  exitHandler();
};

process.on('uncaughtException', unexpectedErrorHandler);
process.on('unhandledRejection', unexpectedErrorHandler);

process.on('SIGTERM', () => {
  if (server) {
    server.close();
  }
});
