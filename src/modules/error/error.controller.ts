import { BaseController } from '@shared/base/base.controller';
import { Controller, Get, Render, Request, UseGuards } from '@nestjs/common';
import { I18nService } from 'nestjs-i18n';
import { AuthenticatedGuard } from '@core/guards/authenticated.guard';

@Controller('error')
@UseGuards(AuthenticatedGuard)
export class ErrorController extends BaseController {
  constructor(public readonly i18n: I18nService) {
    super({ i18n });
  }
}
