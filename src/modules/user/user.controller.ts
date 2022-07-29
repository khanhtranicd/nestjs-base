import { BaseController } from '@shared/base/base.controller';
import { Controller, Get, Post, Render, Res, Req, Request, Response, UseGuards, Query, Param } from '@nestjs/common';
import { RACE, ROUTES, STATUS, VIEWS_PATH, HTTP_METHOD } from '@shared/common/constants';
import { I18nService } from 'nestjs-i18n';
import { UserService } from './user.service';
import { SellerService } from '../seller/seller.service';
import { AuthenticatedGuard } from '@core/guards/authenticated.guard';
import { paginationHelper } from '@shared/utils/helper';
import { AbilityFactory, Action } from '@modules/ability/ability.factory';
import UserEntity from '@modules/database/entities/user.entity';
import { AbilitiesGuard } from '@modules/ability/abilities.guard';
import { CheckAbilities } from '@modules/ability/abilities.decorator';

@Controller('user')
@UseGuards(AuthenticatedGuard)
export class UserController extends BaseController {
  constructor(
    public readonly i18n: I18nService,
    private readonly userService: UserService,
    private readonly sellerService: SellerService,
    public abilityFactory: AbilityFactory,
  ) {
    super({ abilityFactory, i18n });
  }

  @Get('/search')
  @UseGuards(AbilitiesGuard)
  @CheckAbilities({ action: Action.Read, subject: UserEntity })
  @Render(VIEWS_PATH.UserSearch)
  async searchPage(@Query() query, @Request() req): Promise<any> {
    const user = req.user;
    const isAllowCreated = this.checkAllowAbility(user, UserEntity, Action.Create);
    const userLang = this.getUserLang(req);
    const roles = await this.userService.getUserRoles();
    const { title, emptyText } = await this.translate('user.search', userLang);
    const langCommon = await this.translate('common', userLang);
    const queryParam = query.page ? query : { page: 1 };

    const { users, total } = await this.userService.searchUsers(queryParam);
    const paginationInfo = paginationHelper(queryParam, total, ROUTES.UserList);

    return {
      isAllowCreated,
      langCommon,
      title,
      users,
      roles,
      total,
      ...paginationInfo,
      query: queryParam,
      emptyText,
      breadcrumbs: this.getBreadcrumbs([{ title }]),
    };
  }

  @Post('/search')
  @UseGuards(AbilitiesGuard)
  @CheckAbilities({ action: Action.Delete, subject: UserEntity })
  @Render(VIEWS_PATH.UserSearch)
  async deleteEmployee(@Request() req) {
    const userLang = this.getUserLang(req);
    await this.userService.deleteUser(req.body.id);
    const { title } = await this.translate('user.search', userLang);
    const langCommon = await this.translate('common', userLang);

    const { users, total } = await this.userService.searchUsers({ page: 1 });
    const paginationInfo = paginationHelper({ page: 1 }, total, ROUTES.UserList);

    return {
      title,
      toast: {
        class: 'bg-success',
        title: langCommon.toast.deleteTitle,
        content: langCommon.toast.deleteSuccess,
      },
      langCommon,
      users,
      total,
      ...paginationInfo,
      query: { page: 1 },
      breadcrumbs: this.getBreadcrumbs([{ title }]),
    };
  }

  @Get('/registration')
  async registration(@Request() req, @Response() res, @Query() query): Promise<any> {
    const isNotManage = this.checkNotAllowAbility(req.user, 'all', Action.Manage);
    const userLang = this.getUserLang(req);
    const employees = await this.sellerService.findAllSellersExceptUserRegistered();
    const roles = await this.userService.getUserRoles();
    const { registration, validationMsg } = await this.translate('user', userLang);
    const langCommon = await this.translate('common', userLang);

    return res.render(VIEWS_PATH.UserCreate, {
      isNotManage,
      langCommon,
      employees,
      roles,
      title: registration.title,
      validationMsg,
      modalDanger: {
        title: langCommon.modal.title,
        content: langCommon.modal.contentDeleteUser,
        btnCancel: langCommon.modal.btnCancel,
        btnSubmit: langCommon.modal.btnSubmit,
        id: query.id,
        action: ROUTES.UserList,
        method: HTTP_METHOD.Post,
      },
      breadcrumbs: this.getBreadcrumbs([{ title: registration.title }]),
    });
  }

  @Post('/registration')
  @UseGuards(AbilitiesGuard)
  @CheckAbilities({ action: Action.Create, subject: UserEntity })
  async register(@Res() res, @Req() req) {
    const payload = req.body;
    await this.userService.register(payload);
    res.redirect(ROUTES.UserRegistration);
  }

  @Get('/me')
  @Render(VIEWS_PATH.UserProfile)
  async me(@Request() req): Promise<any> {
    const user = req.user;
    const userLang: string = this.getUserLang(req);
    const langCommon = await this.translate('common', userLang);
    user.employee.genderToString = await this.getGenderText(user.employee.gender, userLang);
    user.employee.positionToString = this.getPositionText(user.employee.position);
    user.employee.statusToString = STATUS[user.employee.status];
    user.employee.raceToString = RACE[user.employee.race];

    return { langCommon, user, breadcrumbs: this.getBreadcrumbs([{ title: langCommon.panel.profile }]) };
  }

  @Get('/edit/:id')
  async editUser(@Request() req, @Response() res, @Param('id') userId: string): Promise<any> {
    const user = req.user;
    const isNotManage = this.checkNotAllowAbility(user, 'all', Action.Manage);
    const isAllowDeleted = this.checkAllowAbility(user, UserEntity, Action.Delete);
    const userLang = this.getUserLang(req);
    const roles = await this.userService.getUserRoles();
    let userDetail;
    try {
      userDetail = await this.userService.findById(Number(userId));
      if (userDetail.id !== user.id && isNotManage) {
        return res.redirect(ROUTES.UserList);
      }
    } catch (err) {
      return res.redirect(ROUTES.Error404);
    }

    const { registration, validationMsg, search } = await this.translate('user', userLang);
    const langCommon = await this.translate('common', userLang);
    const breadcrumbsInfo = [
      { title: search.title, path: this.getMenuParentPath(req.url, userId) },
      { title: registration.titleEditing },
    ];

    return res.render(VIEWS_PATH.UserEdit, {
      isNotManage,
      isAllowDeleted,
      langCommon,
      userDetail,
      roles,
      title: registration.titleEditing,
      validationMsg,
      modalDanger: {
        title: langCommon.modal.title,
        content: langCommon.modal.contentDeleteUser,
        btnCancel: langCommon.modal.btnCancel,
        btnSubmit: langCommon.modal.btnSubmit,
        id: userId,
        action: ROUTES.UserList,
        method: HTTP_METHOD.Post,
      },
      breadcrumbs: this.getBreadcrumbs(breadcrumbsInfo),
    });
  }

  @Get('/account')
  async editProfile(@Request() req, @Response() res): Promise<any> {
    const user = req.user;
    const userLang = this.getUserLang(req);

    const { editProfile, validationMsg } = await this.translate('user', userLang);
    const langCommon = await this.translate('common', userLang);
    return res.render(VIEWS_PATH.UserEditProfile, {
      langCommon,
      userDetail: user,
      authorityName: this.getAuthorityName(user.authority),
      title: editProfile.title,
      validationMsg,
      breadcrumbs: this.getBreadcrumbs([{ title: editProfile.title }]),
    });
  }
}
