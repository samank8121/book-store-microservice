import { Module } from '@nestjs/common';
import { BooksModule } from './books/books.module';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), AuthModule, BooksModule],
})
export class BookstoreApiGatewayModule {}
