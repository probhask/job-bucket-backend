import { ENVIRONMENT } from '@/constants';
import { Response } from 'express';
import morgan from 'morgan';
import config from './config';
import logger from './logger';

morgan.token('message', (_, res: Response) => res.locals.errorMessage || '');

const getIpFormat = () =>
  config.env === ENVIRONMENT.DEVELOPMENT ? ':remote-addr - ' : '';
const successResponseFormat = `${getIpFormat()}:method :url :status :response-time ms`;
const errorResponseFormat = `${getIpFormat()}:method :url :status :response-time ms - message :message`;

export const successHandler = morgan(successResponseFormat, {
  skip: (_, res) => res.statusCode >= 400,
  stream: { write: (message) => logger.info(message.trim()) },
});
export const errorHandler = morgan(errorResponseFormat, {
  skip: (_, res) => res.statusCode < 400,
  stream: { write: (message) => logger.error(message.trim()) },
});
export default {
  successHandler,
  errorHandler,
};
