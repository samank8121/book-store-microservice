import { Injectable } from '@nestjs/common';
import { UsersService } from './users.service';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UsersService,
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
  ) {}

  async login(email: string, password: string) {
    const result = await this.userService.validateUser(email, password);
    if ('error' in result) {
      return result.error;
    }
    const expires = new Date();
    expires.setSeconds(
      expires.getSeconds() + this.configService.get('EXPIRATION_TIME'),
    );
    const tokenPayload = {
      userId: result._id.toHexString(),
    };
    const token = this.jwtService.sign(tokenPayload); 
    return {
      access_token: token,  
      expires
    }
  }
}
