import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';

import bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private userService: UserService, private jwtService: JwtService) {}

  async validateUser(payload): Promise<any> {
    const { username, password } = payload;
    const user = await this.userService.findOne({
      relations: ['seller'],
      where: {
        seller: {
          email: username,
          delete_flg: 0,
        },
      },
    });
    if (!user) {
      return null;
    }

    const passwordMatch = await bcrypt.compare(password, user.user_password);
    if (passwordMatch) {
      const { user_password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: any) {
    if (!user) return null;
    const payload = { username: user.seller.email, user_id: user.seller.id };
    return {
      login: true,
      access_token: this.jwtService.sign(payload),
    };
  }
}
