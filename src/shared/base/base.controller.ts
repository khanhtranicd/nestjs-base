import { AUTHORITY } from '@shared/common/constants';
import { HttpStatus } from '@nestjs/common';
import { LOCALES } from './../common/constants';
import { LoggerService } from '@modules/logger/logger.service';

export class BaseController {
  abilityFactory: any;
  i18n: any;
  loggerService: LoggerService;
  constructor(options) {
    this.abilityFactory = options.abilityFactory;
    this.i18n = options.i18n;
    this.loggerService = options?.loggerService;
  }

  public checkAllowAbility(user, subject, action): boolean {
    if (!this.abilityFactory) {
      return false;
    }

    const ability = this.abilityFactory.defineAbility(user);
    return ability.can(action, subject);
  }

  public checkNotAllowAbility(user, subject, action): boolean {
    if (!this.abilityFactory) {
      return false;
    }

    const ability = this.abilityFactory.defineAbility(user);
    return ability.cannot(action, subject);
  }

  public getUserLang(request): string {
    const userLang = request.user?.lang;
    return [LOCALES.Japan, LOCALES.English].includes(userLang) ? userLang : LOCALES.English;
  }

  public async getGender(lang: string) {
    const { gender } = await this.translate('common', lang);

    return {
      1: gender.male,
      2: gender.female,
    };
  }

  public getAuthorityName(authorityValue: number): string {
    let name: string = '';
    Object.keys(AUTHORITY).forEach((key: string) => {
      if (AUTHORITY[key] === authorityValue) {
        name = key;
      }
    });

    return name;
  }

  public translate(subject: string, lang: string) {
    return this.i18n.translate(subject, { lang });
  }

  public ok(res, data, status: number = HttpStatus.OK) {
    return res.status(status).json({ success: true, data });
  }

  public notFound(res, message: string) {
    return res.status(HttpStatus.NOT_FOUND).json({ success: false, message });
  }

  public error(res, message: string, statusCode: number = HttpStatus.INTERNAL_SERVER_ERROR) {
    return res.status(statusCode).json({ success: false, message });
  }

  public async getGenderText(genderEnum: number, lang: string) {
    const gender = await this.getGender(lang);
    return gender[genderEnum] || '';
  }

  public mergeLangObjects(...args) {
    let obj = {};
    Object.keys(args).forEach((key) => {
      if (typeof args[key] === 'string') {
        obj[key] = args[key];
      } else {
        obj = { ...obj, ...args[key] };
      }
    });

    return obj;
  }
}
