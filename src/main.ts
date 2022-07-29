import { MENU_ROUTES_LEVEL, ROUTES } from '@shared/common/constants';
import * as dotenv from 'dotenv';
dotenv.config();

import { NestFactory } from '@nestjs/core';
import { join } from 'path';
import { NestExpressApplication } from '@nestjs/platform-express';
import hbs from 'hbs';
import session from 'express-session';
import passport from 'passport';
import mysql from 'mysql';

import { ValidationPipe } from './core/pipe/validation.pipe';
import { AppModule } from './app.module';
import { config } from './config';
import { ForbiddenExceptionFilter } from './core/filters/forbidden-exception.filter';
import { SessionConfigs } from './shared/common/types';
const MysqlStore = require('express-mysql-session')(session);

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    logger: config.logLevels,
  });

  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalFilters(new ForbiddenExceptionFilter());

  app.useStaticAssets(join(__dirname, '..', 'public'));
  app.useStaticAssets(join(__dirname, '..', 'html'), { prefix: '/html' });
  app.setBaseViewsDir(join(__dirname, '..', 'views'));
  hbs.registerPartials(join(__dirname, '..', 'views/partials'));
  hbs.registerPartials(join(__dirname, '..', 'views/layout'));
  hbs.registerHelper('is_not_equal', (value1, value2) => value1 !== value2);
  hbs.registerHelper('is_equal', (value1, value2) => value1 == value2);
  hbs.registerHelper('obj_to_json', (obj_data) => JSON.stringify(obj_data));
  hbs.registerHelper('routes', (property) => ROUTES[property]);
  hbs.registerHelper('menu_routes_level', () => new hbs.SafeString(JSON.stringify(MENU_ROUTES_LEVEL)));
  hbs.registerHelper(
    'limit_content_length',
    (content: string, maxLength: number) => `${content.slice(0, maxLength)}...`,
  );
  app.setViewEngine('hbs');

  const connection = mysql.createConnection({
    host: config.DB_HOST,
    port: config.DB_PORT,
    user: config.DB_USER,
    password: config.DB_PASSWORD,
    database: config.DB_NAME,
    waitForConnections: true,
    socketPath: config.SOCKET_PATH,
  });

  const sessionConfigs: SessionConfigs = {
    secret: config.SECRET_KEY,
    resave: false,
    saveUninitialized: true,
    rolling: true,
    cookie: {
      maxAge: config.EXPIRE_TIME * 60 * 1000,
      path: '/',
      // secure: config.ENV === ENV_NAMES.Production,
    },
    store: new MysqlStore(
      {
        clearExpired: true,
        checkExpirationInterval: 60000,
        endConnectionOnClose: true,
      },
      connection,
    ),
  };
  app.use(session(sessionConfigs));
  app.use(passport.initialize());
  app.use(passport.session());

  await app.listen(config.PORT);
  console.log(`App running on PORT ${config.PORT}`);
}

bootstrap();
