import { AuthConfig } from './auth.type';
import { ENV_NAMES } from '@shared/common/constants';
import * as dotenv from 'dotenv';
dotenv.config();

const envName: string = process.env.NODE_ENV || ENV_NAMES.Development;
const configs = {
  base: {
    ENV: envName,
    DEV: envName === ENV_NAMES.Development,
    SECRET_KEY: process.env.SECRET_KEY,
    EXPIRES_IN: process.env.EXPIRES_IN,
    REFRESH_SECRET_KEY: process.env.REFRESH_SECRET_KEY,
    REFRESH_EXPIRES_IN: process.env.REFRESH_EXPIRES_IN,
  },
  development: {},
  production: {},
};

const config: AuthConfig = { ...configs.base, ...configs[envName] };

export { config };
