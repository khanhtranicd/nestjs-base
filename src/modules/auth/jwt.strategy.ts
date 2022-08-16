import { JwtPayload } from './auth.type';
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { AuthService } from './auth.service';
import { UserService } from '@modules/user/user.service';
import { JWT_SECRET_KEY } from '@shared/common/constants';

console.log('JWT_SECRET_KEY', JWT_SECRET_KEY);

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService, private userService: UserService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: JWT_SECRET_KEY,
    });
  }
  public async validate(payload: JwtPayload): Promise<any> {
    console.log('payload', payload);
    const existingUser = await this.userService.findOne({ email: payload.email });

    if (existingUser) {
      existingUser.login = true;
    }

    return existingUser;
  }
}
