import { LOCALES } from './shared/common/constants';
import { UserModule } from './modules/user/user.module';
import { Module } from '@nestjs/common';
import { DatabaseModule } from './modules/database/db.module';
import { AuthModule } from './modules/auth/auth.module';
import { I18nJsonParser, I18nModule } from 'nestjs-i18n';
import { join } from 'path';
import { AutomapperModule } from '@automapper/nestjs';
import { classes } from '@automapper/classes';
import { CamelCaseNamingConvention, SnakeCaseNamingConvention } from '@automapper/core';
import { SellerModule } from './modules/seller/seller.module';
import { AppController } from './app.controller';
import { MailModule } from './modules/mailer/mail.module';
import { ErrorModule } from '@modules/error/error.module';
import { AbilityModule } from './modules/ability/ability.module';
import { LoggerService } from './modules/logger/logger.service';
import { LoggerModule } from './modules/logger/logger.module';
import { MasterModule } from './modules/master/master.module';
import { StoreModule } from './modules/store/store.module';

@Module({
  imports: [
    DatabaseModule,
    UserModule,
    AuthModule,
    I18nModule.forRoot({
      fallbackLanguage: LOCALES.English,
      parser: I18nJsonParser,
      parserOptions: {
        path: join(__dirname, '/i18n/'),
        watch: true,
      },
    }),
    AutomapperModule.forRoot({
      options: [
        {
          name: 'classMapper',
          pluginInitializer: classes,
          namingConventions: {
            source: new CamelCaseNamingConvention(),
            destination: new SnakeCaseNamingConvention(),
          },
        },
      ],
    }),
    SellerModule,
    MailModule,
    ErrorModule,
    AbilityModule,
    LoggerModule,
    MasterModule,
    StoreModule,
  ],
  controllers: [AppController],
  providers: [LoggerService],
})
export class AppModule {}
