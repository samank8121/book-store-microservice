import { Injectable, Logger } from '@nestjs/common';

import { InjectModel, InjectConnection } from '@nestjs/mongoose';
import { Model, Connection } from 'mongoose';
import { Book } from './schemas/book.schema';
import { AbstractRepository } from '@app/common/database';

@Injectable()
export class BooksRepository extends AbstractRepository<Book> {
  protected readonly logger = new Logger(BooksRepository.name);

  constructor(
    @InjectModel(Book.name) bookModel: Model<Book>,
    @InjectConnection() connection: Connection,
  ) {
    super(bookModel, connection);
  }
}
