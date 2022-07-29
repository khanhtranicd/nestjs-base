import { LOCALES } from './../../shared/common/constants';
import { ExceptionFilter, Catch, ArgumentsHost, UnauthorizedException } from '@nestjs/common';
import { Response } from 'express';
import { LoginFailedException } from '@core/exceptions/loginFailed.exception';
import { I18nService } from 'nestjs-i18n';

@Catch(LoginFailedException)
export class LoginFailedExceptionFilter implements ExceptionFilter {
  constructor(private readonly i18n: I18nService) {}
  async catch(exception: UnauthorizedException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const res = ctx.getResponse<Response>();
    const language = res.req.body?.language || LOCALES.English;
    const { validationMsg } = await this.i18n.translate('login', {
      lang: language,
    });
    res.status(400).send({
      success: false,
      message: validationMsg.login_fail,
    });
  }
}
