import { MailService } from './mail.service';
import { Controller } from '@nestjs/common';

@Controller('mailer')
export class MailController {
  constructor(private readonly mailerService: MailService) {}
}
