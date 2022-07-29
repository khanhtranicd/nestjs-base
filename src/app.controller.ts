import { VIEWS_PATH } from '@shared/common/constants';
import { Controller, Get, Response, Request, UseGuards } from '@nestjs/common';
import { AuthenticatedGuard } from './core/guards/authenticated.guard';
import { I18nService } from 'nestjs-i18n';
import { AbilityFactory, Action } from '@modules/ability/ability.factory';
import { BaseController } from '@shared/base/base.controller';
import { LoggerService } from '@modules/logger/logger.service';

@Controller('')
@UseGuards(AuthenticatedGuard)
export class AppController extends BaseController {
  constructor(
    public readonly i18n: I18nService,
    public abilityFactory: AbilityFactory,
    public loggerService: LoggerService,
  ) {
    super({ abilityFactory, i18n, loggerService });
  }

  @Get('')
  async dashboard(@Request() req, @Response() res): Promise<any> {
    const user = req.user;
    req.user.isManage = this.checkAllowAbility(user, 'all', Action.Manage);
    req.user.position = this.getPositionText(req.user.seller.position);

    const userLang = this.getUserLang(req);
    const langCommon = await this.translate('common', userLang);
    const breadcrumbs = this.getBreadcrumbs();
    return res.render(VIEWS_PATH.HomePage, {
      langCommon,
      breadcrumbs,
    });
  }
}
