import { BaseController } from '@shared/base/base.controller';
import {
  Controller,
  Get,
  Post,
  Render,
  Res,
  Req,
  Request,
  Response,
  UseGuards,
  Query,
  Param,
  Redirect,
} from '@nestjs/common';
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
const shopifyAPI = require('shopify-node-api');

@Controller('store')
@UseGuards(AuthenticatedGuard)
export class StoreController extends BaseController {
  constructor(
    public readonly i18n: I18nService,
    private readonly userService: UserService,
    private readonly sellerService: SellerService,
    public abilityFactory: AbilityFactory,
  ) {
    super({ abilityFactory, i18n });
  }

  @Get('/')
  // @UseGuards(AbilitiesGuard)
  @Render(VIEWS_PATH.StoreIndex)
  async storeIndex(@Query() query, @Request() req): Promise<any> {
    const userLang = this.getUserLang(req);
    const { title, emptyText } = await this.translate('user.search', userLang);
    const langCommon = await this.translate('common', userLang);
    const queryParam = query.page ? query : { page: 1 };

    return {
      langCommon,
      title,
      query: queryParam,
      emptyText,
      breadcrumbs: this.getBreadcrumbs([{ title }]),
    };
  }

  @Get('/sync')
  // @UseGuards(AbilitiesGuard)
  // @Redirect('http://google.com', 302)
  async storeSync(@Query() query, @Request() req, @Response() res) {
    const { store } = req.query;
    console.log('store', store);

    // webapp123.myshopify.com
    const Shopify = new shopifyAPI({
      shop: store,
      shopify_api_key: 'c96a3a699140445f31083d020d141a0e',
      shopify_shared_secret: 'fa30e6fe971a6d900e585764b2878ae3',
      shopify_scope:
        'write_products, read_orders, read_customers, write_customers, read_orders,write_orders, read_shipping, write_shipping, read_analytics',
      redirect_uri: 'http://127.0.0.1:3000/store/sync_callback',
      nonce: '123456', // you must provide a randomly selected value unique for each authorization request
    });
    const tesUrl = await Shopify.buildAuthURL();
    // console.log('tesUrl', tesUrl);
    return res.json(tesUrl);
  }

  @Get('/sync_callback')
  // @UseGuards(AbilitiesGuard)
  // @Redirect('http://google.com', 302)
  async storeSyncCallback(@Query() query, @Request() req, @Response() res) {
    // console.log('tesUrl', tesUrl);
    return res.json(req.query);
  }
}
