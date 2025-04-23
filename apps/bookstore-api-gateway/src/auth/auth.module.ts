import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { AUTH_SERVICE } from './constant';

@Module({
  imports: [
      ConfigModule.forRoot(),
      ClientsModule.registerAsync([
        {
          name: AUTH_SERVICE,
          imports: [ConfigModule],
          useFactory: async (configService: ConfigService) => ({
            transport: Transport.TCP,
            options: { port: configService.get<number>('AUTH_PORT') },
          }),
          inject: [ConfigService],
        },
      ]),
    ],
  controllers: [AuthController],
  providers: [AuthService]
})
export class AuthModule {}
