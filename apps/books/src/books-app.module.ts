import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';
import { DatabaseModule } from '@app/common/database';
import { MongooseModule } from '@nestjs/mongoose';
import { Book, BookSchema } from './schemas/book.schema';
import { Author, AuthorSchema } from './schemas/author.schema';
import { BooksController } from './books.controller';
import { BooksService } from './books.service';
import { BooksRepository } from './books.repository';
import { AuthorsRepository } from './authors.repository';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        MONGODB_URI: Joi.string().required(),
      }),
      //envFilePath: './apps/books/.env',
    }),
    DatabaseModule,
    MongooseModule.forFeature([
      { name: Book.name, schema: BookSchema },
      { name: Author.name, schema: AuthorSchema }
    ]),
  ],
  controllers: [BooksController],
  providers: [BooksService, BooksRepository, AuthorsRepository],
})
export class BooksAppModule {}
