import * as dotenv from 'dotenv';
dotenv.config();

import { ENV_NAMES } from '@shared/common/constants';

const envName: string = process.env.NODE_ENV || ENV_NAMES.Development;

const configs = {
  base: {
    ENV: envName,
    DEV: envName === ENV_NAMES.Development,
    DB_NAME: process.env.MYSQL_DB || 'nest-base',
    DB_HOST: process.env.MYSQL_HOST || '127.0.0.1',
    DB_PORT: Number(process.env.MYSQL_PORT) || '3306',
    DB_USER: process.env.MYSQL_USER || 'nest-base',
    DB_PASSWORD: process.env.MYSQL_PASSWORD || 'nest-base',
    CLOUD_SQL_INSTANT_NAME: process.env.CLOUD_SQL_INSTANT_NAME,
  },
  development: {},
  production: {},
};

const config = { ...configs.base, ...configs[envName] };
export { config };
