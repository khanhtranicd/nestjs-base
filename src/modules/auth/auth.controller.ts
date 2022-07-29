import { BaseController } from '@shared/base/base.controller';
import { UseGuards, Controller, Post, Request, Response, Get, UseFilters, Param } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from '@core/guards/local-auth.guard';
import { LoginFailedExceptionFilter } from '@core/filters/login-failed-exception.filter';
import { I18nService } from 'nestjs-i18n';
import { DEFAULT_LANGUAGE, LOCALES, VIEWS_PATH } from '@shared/common/constants';

@Controller('auth')
export class AuthController extends BaseController {
  constructor(private readonly authService: AuthService, public readonly i18n: I18nService) {
    super({ i18n });
  }

  @UseGuards(LocalAuthGuard)
  @UseFilters(LoginFailedExceptionFilter)
  @Post('/login')
  async login(@Request() req, @Response() res) {
    try {
      req.user.remember = req.body.remember || false;
      req.user.lang = req.body.language || DEFAULT_LANGUAGE;
      const loginData = await this.authService.login(req.user);
      return res.json({ token: loginData });
    } catch (error) {
      return this.error(res, error?.message);
    }
  }

  @Get('/login')
  async loginPage(@Request() req, @Response() res): Promise<any> {
    if (req.isAuthenticated()) return res.redirect('../');
    return res.render(VIEWS_PATH.Login, {});
  }

  @Get('/login/:lang')
  async getLoginLang(@Param('lang') lang: string, @Response() res): Promise<any> {
    lang = [LOCALES.English, LOCALES.Japan].includes(lang) ? lang : LOCALES.English;
    const data = await this.translate('login', lang);
    return this.ok(res, data);
  }

  @Get('/logout')
  async logout(@Request() req, @Response() res): Promise<any> {
    await req.logout();
    return res.redirect('/auth/login');
  }
}
