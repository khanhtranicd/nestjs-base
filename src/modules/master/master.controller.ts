import { AuthenticatedGuard } from '@core/guards/authenticated.guard';
import { Controller, Get, Param, Request, Response, UseGuards } from '@nestjs/common';
import { BaseController } from '@shared/base/base.controller';
import { VIEWS_PATH, ROUTES } from '@shared/common/constants';
import { I18nService } from 'nestjs-i18n';

@Controller('master')
@UseGuards(AuthenticatedGuard)
export class MasterController extends BaseController {
  constructor(public readonly i18n: I18nService) {
    super({ i18n });
  }

  @Get('/')
  async masterRegistration(@Request() req, @Response() res) {
    const langCommon = await this.translate('common', this.getUserLang(req));
    const { title, master } = await this.translate('masterRegistration', this.getUserLang(req));
    return res.render(VIEWS_PATH.MainMaster, {
      title,
      master,
      langCommon,
      breadcrumbs: this.getBreadcrumbs([{ title }]),
    });
  }

  @Get('/:id')
  async listMasterConfig(@Request() req, @Response() res, @Param('id') id: string) {
    const langCommon = await this.translate('common', this.getUserLang(req));
    const userLang: string = this.getUserLang(req);
    const registrationInfo = await this.getMasterRegistrationInfo(Number(id), userLang);
    return res.render(VIEWS_PATH.MasterItemList, {
      langCommon: this.mergeLangObjects(langCommon, {
        title: registrationInfo.title,
        emptyText: 'Empty data',
        contentColumnTitle: registrationInfo.contentColumnTitle,
      }),
      breadcrumbs: this.getBreadcrumbs([
        { title: registrationInfo.parentTitle, path: ROUTES.MainMaster },
        { title: registrationInfo.title },
      ]),
      data: registrationInfo.items,
      isEmptyData: !Boolean(registrationInfo.items.length),
      iconSrc: registrationInfo.iconSrc,
    });
  }

  private async getMasterRegistrationInfo(id: number, userLang: string): Promise<any> {
    const { title, master } = await this.translate('masterRegistration', userLang);
    const { label } = await this.translate('common', userLang);
    switch (id) {
      case 1:
        return {
          parentTitle: title,
          title: master.position,
          iconSrc: '/dist/icons/register.svg',
          contentColumnTitle: label.position,
          items: [
            {
              id: 1,
              title: 'CEO',
            },
            {
              id: 2,
              title: 'Manager',
            },
            {
              id: 3,
              title: 'Technical Manager',
            },
            {
              id: 4,
              title: 'Senior Leader',
            },
            {
              id: 5,
              title: 'Leader',
            },
            {
              id: 6,
              title: 'Sub Leader',
            },
            {
              id: 7,
              title: 'BSE',
            },
            {
              id: 8,
              title: 'Communicator',
            },
            {
              id: 9,
              title: 'General affairs',
            },
            {
              id: 10,
              title: 'Member',
            },
          ],
        };
      case 2:
        return {
          parentTitle: title,
          title: master.bank,
          iconSrc: '/dist/icons/bank.svg',
          contentColumnTitle: label.bankName,
          items: [
            {
              id: 1,
              title: 'Vietcombank',
            },
            {
              id: 2,
              title: 'Vietinbank',
            },
            {
              id: 3,
              title: 'Techcombank',
            },
            {
              id: 4,
              title: 'ACB Bank',
            },
            {
              id: 5,
              title: 'TP Bank',
            },
            {
              id: 6,
              title: 'Sacombank',
            },
            {
              id: 7,
              title: 'BIDV Bank',
            },
            {
              id: 8,
              title: 'Dong A Bank',
            },
            {
              id: 9,
              title: 'VPBank',
            },
            {
              id: 10,
              title: 'Standard Chartered Bank',
            },
          ],
        };
    }

    return {
      parentTitle: title,
      title: '',
      items: [],
      iconSrc: '',
    };
  }
}
