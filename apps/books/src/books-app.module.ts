import { Module } from '@nestjs/common';
import { BooksModule } from './books/books.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule.forRoot(), BooksModule],
  controllers: [],
  providers: [],
})
export class BooksAppModule {}
