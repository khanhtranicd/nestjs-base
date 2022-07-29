import { Module } from '@nestjs/common';
import { MailController } from './mail.controller';
import { MailService } from './mail.service';
import { MailerModule } from '@nestjs-modules/mailer';
import { EjsAdapter } from '@nestjs-modules/mailer/dist/adapters/ejs.adapter';
import { config } from './config';

@Module({
  imports: [
    MailerModule.forRoot({
      transport: {
        host: config.EMAIL_HOST,
        port: config.EMAIL_PORT,
        secure: config.EMAIL_SECURE,
        auth: {
          user: config.EMAIL_ID,
          password: config.EMAIL_PASS,
        },
      },
      defaults: {
        from: config.EMAIL_SENDER,
      },
      template: {
        dir: `${__dirname}/templates`,
        adapter: new EjsAdapter(),
        options: {
          strict: true,
        },
      },
    }),
  ],
  controllers: [MailController],
  providers: [MailService],
})
export class MailModule {}
