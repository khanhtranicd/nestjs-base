import { Moment } from 'moment';
import { ExecutionContext, Injectable, CanActivate } from '@nestjs/common';
import { config } from '../../config';
import DateUtil from '@shared/utils/date-util';
@Injectable()
export class AuthenticatedGuard implements CanActivate {
  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    const response = context.switchToHttp().getResponse();
    response.locals.currentUser = request.user || {};
    const newExpireTime: number = config[request.user?.remember ? 'REMEMBER_LOGIN_EXPIRE_TIME' : 'EXPIRE_TIME'];
    if (this.isRefreshSession(request, newExpireTime)) {
      request.session.cookie.expires = new Date(Date.now() + newExpireTime * 60 * 1000);
      request.session.save();
    }

    return request.isAuthenticated();
  }

  private isRefreshSession(request: any, newExpireTime: number): boolean {
    const refreshTime: Moment = DateUtil.addDuration(DateUtil.currentDate(), newExpireTime / 3, 'minutes');
    return request.user && DateUtil.diff(refreshTime, request.session.cookie.expires) > 0;
  }
}
