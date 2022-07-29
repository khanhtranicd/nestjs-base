import { Controller, Get, Post, Render, Request, Response, Query, UseGuards, Param } from '@nestjs/common';
import { DEPENDENTS, HTTP_METHOD, PAGE_TITLE, POSITION, RACE, ROUTES, VIEWS_PATH } from '@shared/common/constants';
import { SellerService } from './seller.service';
import { I18nService } from 'nestjs-i18n';
import { AuthenticatedGuard } from '@core/guards/authenticated.guard';
import { paginationHelper } from '@shared/utils/helper';
import { AbilityFactory, Action } from '@modules/ability/ability.factory';
import { CheckAbilities } from '@modules/ability/abilities.decorator';
import { AbilitiesGuard } from '@modules/ability/abilities.guard';
import SellerEntity from '@modules/database/entities/seller.entity';
import { BaseController } from '@shared/base/base.controller';

@Controller('seller')
@UseGuards(AuthenticatedGuard)
export class SellerController extends BaseController {
  constructor(
    private readonly sellerService: SellerService,
    public readonly i18n: I18nService,
    public abilityFactory: AbilityFactory,
  ) {
    super({ abilityFactory, i18n });
  }

  @Get('/search')
  @UseGuards(AbilitiesGuard)
  @CheckAbilities({ action: Action.Read, subject: SellerEntity })
  async search(@Query() query, @Request() req, @Response() res): Promise<any> {
    const isAllowCreated = this.checkAllowAbility(req.user, SellerEntity, Action.Create);
    const lang = this.getUserLang(req);
    const { search } = await this.translate('seller', lang);
    const langCommon = await this.translate('common', lang);
    const queryParam = query?.page ? query : { page: 1 };

    const { sellers, total } = await this.sellerService.searchSellers(queryParam);
    sellers.map((seller) => {
      seller.isEnableLink = req.user.isManage || req.user.seller.id === seller.id;
      seller.position = POSITION[seller.position];
      return seller;
    });

    const paginationInfo = paginationHelper(queryParam, total, '/seller/search');
    return res.render(VIEWS_PATH.SellerSearch, {
      isAllowCreated,
      sellers,
      total,
      ...paginationInfo,
      query: queryParam,
      position: POSITION,
      status: await this.getSellerStatus(lang),
      title: search.title,
      emptyText: search.empty,
      langCommon,
      breadcrumbs: this.getBreadcrumbs([{ title: search.title }]),
    });
  }

  @Post('/search')
  @UseGuards(AbilitiesGuard)
  @CheckAbilities({ action: Action.Delete, subject: SellerEntity })
  @Render(VIEWS_PATH.SellerSearch)
  async deleteSeller(@Request() req) {
    const userLang: string = this.getUserLang(req);
    await this.sellerService.deleteById(req.body.id);
    const langCommon = await this.translate('common', userLang);
    const { search } = await this.translate('seller', userLang);

    return {
      title: PAGE_TITLE.SellerSearch,
      position: POSITION,
      status: await this.getSellerStatus(userLang),
      toast: {
        class: 'bg-success',
        title: langCommon.toast.deleteTitle,
        content: langCommon.toast.deleteSuccess,
      },
      langCommon,
      breadcrumbs: this.getBreadcrumbs([{ title: search.title }]),
    };
  }

  @Get('/registration')
  async registration(@Query() query, @Request() req, @Response() res): Promise<any> {
    const userLang: string = this.getUserLang(req);
    const { validationMsg, registration } = await this.translate('seller', userLang);
    const langCommon = await this.translate('common', userLang);

    return res.render(VIEWS_PATH.SellerCreate, {
      title: registration.title,
      validationMsg,
      position: POSITION,
      status: await this.getSellerStatus(userLang),
      gender: await this.getGender(userLang),
      race: RACE,
      dependents: DEPENDENTS,
      modalDanger: {
        title: langCommon.modal.title,
        content: langCommon.modal.contentDeleteSeller,
        btnCancel: langCommon.modal.btnCancel,
        btnSubmit: langCommon.modal.btnSubmit,
        id: query.id,
        action: ROUTES.SellerList,
        method: HTTP_METHOD.Post,
      },
      langCommon,
      userLang,
      breadcrumbs: this.getBreadcrumbs([{ title: registration.title }]),
    });
  }

  @Get('/edit/:id')
  async editSeller(@Request() req, @Response() res, @Param('id') sellerId: string): Promise<any> {
    try {
      const isNotManage: boolean = this.checkNotAllowAbility(req.user, 'all', Action.Manage);
      const isAllowDeleted: boolean = this.checkAllowAbility(req.user, SellerEntity, Action.Delete);
      const userLang: string = this.getUserLang(req);
      const seller: SellerEntity = await this.sellerService.findById(Number(sellerId));
      if (seller.id !== req.user?.seller.id && isNotManage) {
        return res.redirect(ROUTES.SellerList);
      }

      const { validationMsg, registration, search } = await this.translate('seller', userLang);
      const langCommon = await this.translate('common', userLang);

      return res.render(VIEWS_PATH.SellerEdit, {
        isAllowDeleted,
        seller,
        title: registration.titleEditing,
        validationMsg,
        position: POSITION,
        status: await this.getSellerStatus(userLang),
        gender: await this.getGender(userLang),
        race: RACE,
        dependents: DEPENDENTS,
        modalDanger: {
          title: langCommon.modal.title,
          content: langCommon.modal.contentDeleteSeller,
          btnCancel: langCommon.modal.btnCancel,
          btnSubmit: langCommon.modal.btnSubmit,
          id: sellerId,
          action: ROUTES.SellerList,
          method: HTTP_METHOD.Post,
        },
        langCommon,
        userLang,
        breadcrumbs: this.getBreadcrumbs([
          { title: search.title, path: this.getMenuParentPath(req.url, sellerId) },
          { title: registration.titleEditing },
        ]),
      });
    } catch (err) {
      return res.redirect(ROUTES.Error404);
    }
  }

  @Post('/check-email')
  async checkEmailExists(@Request() req) {
    const isExisted: boolean = await this.sellerService.checkEmailExists(req.body.email);
    return !isExisted;
  }

  @Post('/registration')
  @UseGuards(AbilitiesGuard)
  @CheckAbilities({ action: Action.Create, subject: SellerEntity })
  async create(@Request() req, @Response() res) {
    req.body.id !== undefined && delete req.body.id;
    await this.sellerService.registration(req.body);
    return this.ok(res, {});
  }

  @Post('/update')
  @UseGuards(AbilitiesGuard)
  @CheckAbilities({ action: Action.Create, subject: SellerEntity })
  async updateSeller(@Request() req, @Response() res) {
    req.body?.email && delete req.body.email;
    const existingSeller: SellerEntity = await this.sellerService.findOne({ id: req.body.id });
    if (!existingSeller) {
      const { errorMessages } = await this.translate('common', this.getUserLang(req));
      return this.notFound(res, errorMessages.idNotFound);
    }

    const created: SellerEntity = await this.sellerService.registration(req.body);
    return this.ok(res, created);
  }

  @Post('/confirm')
  @Render(VIEWS_PATH.SellerConfirmCreate)
  async confirmPost(@Request() req) {
    const userLang: string = this.getUserLang(req);
    const { registration } = await this.translate('seller', userLang);
    const langCommon = await this.translate('common', userLang);

    req.body.genderToString = await this.getGenderText(req.body.gender, userLang);
    req.body.positionToString = this.getPositionText(req.body.position);
    req.body.statusToString = await this.getSellerStatusText(req.body.status, userLang);
    return {
      registrationData: req.body,
      title: registration.titleConfirm,
      langCommon,
      breadcrumbs: this.getBreadcrumbs([
        { title: registration.titleEditing, path: this.getMenuParentPath(req.url) },
        { title: registration.titleConfirm },
      ]),
    };
  }

  @Post('/confirm/:id')
  @Render(VIEWS_PATH.SellerConfirmEdit)
  async confirmUpdate(@Request() req, @Param('id') sellerId: string) {
    const userLang: string = this.getUserLang(req);
    const { registration } = await this.translate('seller', userLang);
    const langCommon = await this.translate('common', userLang);

    req.body.genderToString = await this.getGenderText(req.body.gender, userLang);
    req.body.positionToString = this.getPositionText(req.body.position);
    req.body.statusToString = await this.getSellerStatusText(req.body.status, userLang);
    return {
      registrationData: req.body,
      title: registration.titleConfirm,
      langCommon,
      breadcrumbs: this.getBreadcrumbs([
        { title: registration.titleEditing, path: this.getMenuParentPath(req.url, sellerId) },
        { title: registration.titleConfirm },
      ]),
    };
  }

  @Get('/confirm')
  @Render(VIEWS_PATH.SellerConfirmCreate)
  async confirm(@Request() req): Promise<any> {
    const userLang: string = this.getUserLang(req);
    const { registration } = await this.translate('seller', userLang);
    const langCommon = await this.translate('common', userLang);

    return {
      title: registration.titleConfirm,
      langCommon,
      breadcrumbs: this.getBreadcrumbs([
        { title: registration.titleEditing, path: this.getMenuParentPath(req.url) },
        { title: registration.titleConfirm },
      ]),
    };
  }

  @Get('/confirm/:id')
  @Render(VIEWS_PATH.SellerConfirmEdit)
  async confirmEditSeller(@Request() req, @Param('id') sellerId: string): Promise<any> {
    const userLang: string = this.getUserLang(req);
    const { registration } = await this.translate('seller', userLang);
    const langCommon = await this.translate('common', userLang);

    return {
      title: registration.titleConfirm,
      langCommon,
      breadcrumbs: this.getBreadcrumbs([
        { title: registration.titleEditing, path: this.getMenuParentPath(req.url, sellerId) },
        { title: registration.titleConfirm },
      ]),
    };
  }

  private async getSellerStatus(lang) {
    const { status } = await this.translate('seller', lang);

    return {
      0: status.resigned,
      1: status.employed,
    };
  }

  private async getSellerStatusText(statusEnum, lang) {
    const genderObj = await this.getSellerStatus(lang);
    return genderObj[statusEnum];
  }
}
