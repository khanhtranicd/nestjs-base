import { Controller, UseGuards } from '@nestjs/common';
import { AuthenticatedGuard } from './core/guards/authenticated.guard';
import { I18nService } from 'nestjs-i18n';
import { AbilityFactory } from '@modules/ability/ability.factory';
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
}
