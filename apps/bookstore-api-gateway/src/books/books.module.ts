import { Module } from '@nestjs/common';
import { BooksService } from './books.service';
import { BooksController } from './books.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { BOOKS_SERVICE } from './constant';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JWTAuthModule } from '@app/common';

@Module({
  imports: [
    ConfigModule.forRoot(),
    JWTAuthModule,
    ClientsModule.registerAsync([
      {
        name: BOOKS_SERVICE,
        imports: [ConfigModule],
        useFactory: async (configService: ConfigService) => ({
          transport: Transport.RMQ,
          options: {
            urls: [configService.get<string>('RABBITMQ_URL')],
            queue: configService.get<string>('BOOKS_QUEUE'),
          },
        }),
        inject: [ConfigService],
      },
    ]),
  ],
  controllers: [BooksController],
  providers: [BooksService],
})
export class BooksModule {}
