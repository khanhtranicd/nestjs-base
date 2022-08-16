import * as dotenv from 'dotenv';
dotenv.config();

import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import session from 'express-session';
import passport from 'passport';

import { ValidationPipe } from './core/pipe/validation.pipe';
import { AppModule } from './app.module';
import { config } from './config';
import { ForbiddenExceptionFilter } from './core/filters/forbidden-exception.filter';
import { SessionConfigs } from './shared/common/types';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    logger: config.logLevels,
  });

  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalFilters(new ForbiddenExceptionFilter());

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
  };
  app.use(session(sessionConfigs));
  app.use(passport.initialize());
  app.use(passport.session());

  await app.listen(config.PORT);
  console.log(`App running on PORT ${config.PORT}`);
}

bootstrap();
