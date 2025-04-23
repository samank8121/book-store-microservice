import { Injectable, Logger } from '@nestjs/common';
import { InjectModel, InjectConnection } from '@nestjs/mongoose';
import { Model, Connection } from 'mongoose';
import { Author } from './schemas/author.schema';
import { AbstractRepository } from '@app/common/database';

@Injectable()
export class AuthorsRepository extends AbstractRepository<Author> {
  protected readonly logger = new Logger(AuthorsRepository.name);

  constructor(
    @InjectModel(Author.name) authorModel: Model<Author>,
    @InjectConnection() connection: Connection,
  ) {
    super(authorModel, connection);
  }
}
