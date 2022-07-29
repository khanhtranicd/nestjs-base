import { HttpException, HttpStatus } from '@nestjs/common';

export class LoginFailedException extends HttpException {
  constructor() {
    super('LoginFailed', HttpStatus.BAD_REQUEST);
  }
}
