import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { config } from './config';
@Injectable()
export class MailService {
  constructor(private readonly mailerService: MailerService) {}

  public send(mailTo: string): void {
    this.mailerService.sendMail({
      to: mailTo,
      from: config.MAIL_SENDER,
      subject: 'Testing NestJs Mailer Module',
      template: 'test',
    });
  }
}
