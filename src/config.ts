import { ENV_NAMES } from '@shared/common/constants';
import * as dotenv from 'dotenv';

dotenv.config();

const envName: string = process.env.NODE_ENV || ENV_NAMES.Development;

const configs = {
  base: {
    ENV: envName,
    DEV: envName === ENV_NAMES.Development,
    HOST: process.env.ICD_APP_HOST || 'localhost',
    PORT: process.env.ICD_APP_PORT || 3000,
    SECRET_KEY: process.env.SECRET_KEY || 'localhost',
    EXPIRE_TIME: Number(process.env.EXPIRE_TIME) || 60, // in minutes
    REMEMBER_LOGIN_EXPIRE_TIME: Number(process.env.REMEMBER_LOGIN_EXPIRE_TIME) || 12 * 60, // default 12 hours.
    DB_NAME: process.env.MYSQL_DB,
    DB_HOST: process.env.MYSQL_HOST,
    DB_PORT: Number(process.env.MYSQL_PORT) || '3306',
    DB_USER: process.env.MYSQL_USER,
    DB_PASSWORD: process.env.MYSQL_PASSWORD,
    SOCKET_PATH: null,
    logLevels: ['log', 'error', 'warn'],
  },
  production: {
    SOCKET_PATH: process.env.MYSQL_HOST || 'localhost',
    logLevels: ['warn', 'error'],
  },
};

const config = { ...configs.base, ...configs[envName] };

export { config };
