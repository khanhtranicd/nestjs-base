import { BaseController } from '@shared/base/base.controller';
import { Controller, Get, Post, Res, Req, Request, Response, UseGuards, Query } from '@nestjs/common';
import { I18nService } from 'nestjs-i18n';
import { UserService } from './user.service';
import { JwtAuthGuard } from '@core/guards/jwt-auth.guard';
import { AbilityFactory, Action } from '@modules/ability/ability.factory';
import UserEntity from '@modules/database/entities/user.entity';
import { CheckAbilities } from '@modules/ability/abilities.decorator';
import { AuthenticatedGuard } from '@core/guards/authenticated.guard';

@Controller('user')
@UseGuards(AuthenticatedGuard)
export class UserController extends BaseController {
  constructor(
    public readonly i18n: I18nService,
    private readonly userService: UserService,
    public abilityFactory: AbilityFactory,
  ) {
    super({ abilityFactory, i18n });
  }

  @Get('/')
  @UseGuards(JwtAuthGuard)
  @CheckAbilities({ action: Action.Read, subject: UserEntity })
  async searchPage(@Query() query, @Request() req, @Response() res): Promise<any> {
    const users = await this.userService.fetchAllUser();
    return res.json({ users });
  }

  @Post('/register')
  // @UseGuards(AbilitiesGuard)
  // @CheckAbilities({ action: Action.Create, subject: UserEntity })
  async register(@Res() res, @Req() req) {
    const payload = req.body;
    const created = await this.userService.register(payload);
    return res.json({ created });
  }

  @Get('/me')
  @UseGuards(JwtAuthGuard)
  async me(@Request() req, @Response() res): Promise<any> {
    return res.json({ user: req.user });
  }
}
