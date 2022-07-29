import { Injectable, Scope, Logger } from '@nestjs/common';

@Injectable({ scope: Scope.TRANSIENT })
export class LoggerService extends Logger {
  constructor() {
    super();
  }

  public error(message: any, trace: any = '', context: any = '') {
    super.error(message, trace, context);
  }

  public warn(message: any, context: any = '') {
    super.warn(message, context);
  }

  public info(message: any, context: any = '') {
    super.log(message, context);
  }

  public debug(message: any, context: any = '') {
    super.debug(message, context);
  }

  public verbose(message: any, context: any = '') {
    super.verbose(message, context);
  }
}
