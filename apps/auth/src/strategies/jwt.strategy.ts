import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UsersService } from '../users.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    configService: ConfigService,
    private readonly usersService: UsersService
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (request: any) => {
          return request?.Authentication;
        },
      ]),
      secretOrKey: configService.get('TOKEN_SECRET_KEY'),
    });
  }

  async validate({ userId }: { userId: string }) {
    try {
      const result = await this.usersService.findOne(userId);

      return result;
    } catch(error) {
      console.error('Error in JwtStrategy validate:', error);
      throw new UnauthorizedException('JwtStrategy validate error');
    }
  }
}
