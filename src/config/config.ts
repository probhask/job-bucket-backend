import Joi from 'joi';
import path from 'path';
import dotenv from 'dotenv';
import { ENVIRONMENT } from '@constants';

dotenv.config({ path: path.resolve(__dirname, '../../.env') });

const envVarsSchema = Joi.object()
  .keys({
    PORT: Joi.number().description('PORT is required').required(),
    DATABASE_URI: Joi.string()
      .description('MONGODB_URI is required')
      .required(),
    JWT_SECRET: Joi.string().description('JWT_SECRET is required').required(),
    JWT_ACCESS_EXPIRATION_MINUTES: Joi.number()
      .description('JWT_ACCESS_EXPIRATION_MINUTES is required')
      .required(),
    JWT_REFRESH_EXPIRATION_DAYS: Joi.number()
      .description('JWT_REFRESH_EXPIRATION_DAYS is required')
      .required(),
    JWT_RESET_PASSWORD_EXPIRATION_MINUTES: Joi.number()
      .description('JWT_RESET_PASSWORD_EXPIRATION_MINUTES is required')
      .required(),
    JWT_VERIFY_EMAIL_EXPIRATION_MINUTES: Joi.number()
      .description('JWT_VERIFY_EMAIL_EXPIRATION_MINUTES is required')
      .required(),
    APP_FRONTEND_URL: Joi.string()
      .description('APP_FRONTEND_URL is required')
      .required(),
    NODE_ENV: Joi.string()
      .valid(...Object.values(ENVIRONMENT))
      .default(ENVIRONMENT.DEVELOPMENT)
      .error(
        new Error(
          `NODE_ENV must be one of ${Object.values(ENVIRONMENT).join(', ')}`,
        ),
      )
      .description('NODE_ENV is required')
      .required(),

    // email service configuration
    SEND_GRID_API_KEY: Joi.string()
      .required()
      .description('SEND_GRID_API_KEY is required'),
    SEND_GRID_FROM_EMAIL: Joi.string()
      .required()
      .description('SEND_GRID_FROM_EMAIL is required'),
    MASTER_PASSWORD: Joi.string().optional(),
    MASTER_OTP: Joi.string().optional(),
  })
  .unknown();

const { value: envVars, error } = envVarsSchema
  .prefs({ errors: { label: 'key' } })
  .validate(process.env);

if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

export default {
  port: envVars.PORT,
  databaseUri: envVars.DATABASE_URI,
  jwt: {
    secret: envVars.JWT_SECRET,
    accessExpirationMinutes: envVars.JWT_ACCESS_EXPIRATION_MINUTES,
    refreshExpirationDays: envVars.JWT_REFRESH_EXPIRATION_DAYS,
    resetPasswordExpirationMinutes:
      envVars.JWT_RESET_PASSWORD_EXPIRATION_MINUTES,
    verifyEmailExpirationMinutes: envVars.JWT_VERIFY_EMAIL_EXPIRATION_MINUTES,
  },
  appFrontendUrl: envVars.APP_FRONTEND_URL,
  env: envVars.NODE_ENV,
  sendGrid: {
    from: envVars.SEND_GRID_FROM_EMAIL,
    apiKey: envVars.SEND_GRID_API_KEY,
  },
  masterPassword: envVars.MASTER_PASSWORD,
  masterOtp: envVars.MASTER_OTP,
};
