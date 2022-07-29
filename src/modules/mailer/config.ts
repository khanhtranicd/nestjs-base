import { ENV_NAMES } from '@shared/common/constants';
import dotenv from 'dotenv';
dotenv.config();

const envName: string = process.env.NODE_ENV;

const configs = {
  base: {
    ENV: envName,
    DEV: envName === ENV_NAMES.Development,
    EMAIL_HOST: process.env.EMAIL_HOST || 'smtp-relay.sendinbue.com',
    EMAIL_PORT: process.env.EMAIL_PORT || 587,
    EMAIL_ID: process.env.EMAIL_ID || 'example@mail.com',
    EMAIL_PASS: process.env.EMAIL_PASS || 'abcd',
    EMAIL_SECURE: process.env.EMAIL_SECURE || false, //true for 465, false for other port
    EMAIL_SENDER: process.env.EMAIL_SENDER || '"No Reply" <noreply0@mail.com',
  },
  development: {},
  production: {},
};

const config = { ...configs.base, ...configs[envName] };
export { config };
