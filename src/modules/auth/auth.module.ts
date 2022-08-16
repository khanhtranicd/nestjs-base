import { JwtStrategy } from './jwt.strategy';
import { LocalStrategy } from './local.strategy';
import { UserModule } from './../user/user.module';
import { AuthController } from './auth.controller';
import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { SessionSerializer } from './session.serializer';
import { JWT_SECRET_KEY } from '@shared/common/constants';

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: JWT_SECRET_KEY,
    }),
    UserModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, JwtStrategy, SessionSerializer],
  exports: [PassportModule, JwtModule],
})
export class AuthModule {}
