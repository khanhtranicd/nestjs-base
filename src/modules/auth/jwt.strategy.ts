import { JwtPayload } from './auth.type';
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { AuthService } from './auth.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: 'secretKey',
    });
  }

  public async validate(payload: JwtPayload): Promise<any> {
    const existingUser: any = await this.authService.validateUser(payload);
    if (existingUser) {
      existingUser.login = true;
    }

    return existingUser;
  }
}
