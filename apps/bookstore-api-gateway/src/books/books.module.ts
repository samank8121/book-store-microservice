import { Module } from '@nestjs/common';
import { BooksService } from './books.service';
import { BooksController } from './books.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { BOOKS_SERVICE } from './constant';

@Module({
    imports: [
      ClientsModule.register([
        {
          name: BOOKS_SERVICE,
          transport: Transport.TCP,
          options: { port: 3002 },
        },
      ]),
    ],
  controllers: [BooksController],
  providers: [BooksService],
})
export class BooksModule {}
