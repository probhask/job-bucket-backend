import { ENVIRONMENT } from '@constants';
import config from './config';

import winston from 'winston';

const enumerateErrorFormat = winston.format((info) => {
  if (info instanceof Error) {
    Object.assign(info, { message: info.stack });
  }
  return info;
});

const logger = winston.createLogger({
  format: winston.format.combine(
    enumerateErrorFormat(),
    config.env === ENVIRONMENT.DEVELOPMENT
      ? winston.format.colorize()
      : winston.format.uncolorize(),
    winston.format.splat(),
    winston.format.printf(({ level, message }) => `${level} ${message}`),
  ),
  level: config.env === ENVIRONMENT.DEVELOPMENT ? 'debug' : 'info',
  transports: [
    new winston.transports.Console({
      stderrLevels: ['error'],
    }),
  ],
});
export default logger;
