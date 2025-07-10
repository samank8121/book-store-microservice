import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { AUTH_SERVICE } from '@app/common';

@Module({
  imports: [
    ConfigModule.forRoot(),
     ClientsModule.registerAsync([
      {
        name: AUTH_SERVICE,
        imports: [ConfigModule],
        useFactory: async (configService: ConfigService) => {
          const host = configService.get<string>('AUTH_SERVICE_HOST');
          console.log('AUTH_SERVICE_HOST:', host);
          return {
            transport: Transport.TCP,
            options: { 
              host,
              port: configService.get<number>('AUTH_PORT') 
            },
          };
        },
        inject: [ConfigService],
      },
    ]),
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
