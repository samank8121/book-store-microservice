import { Logger, NotFoundException } from '@nestjs/common';
import {
  FilterQuery,
  Model,
  Types,
  UpdateQuery,
  SaveOptions,
  Connection,
  ProjectionType,
  ClientSession,
  DeleteResult,
} from 'mongoose';
import { AbstractDocument } from './abstract.schema';

export abstract class AbstractRepository<TDocument extends AbstractDocument> {
  protected abstract readonly logger: Logger;

  constructor(
    protected readonly model: Model<TDocument>,
    private readonly connection: Connection,
  ) {}

  async create(
    document: Omit<TDocument, '_id'>,
    options?: SaveOptions,
  ): Promise<TDocument> {
    const createdDocument = new this.model({
      ...document,
      _id: new Types.ObjectId(),
    });
    return (
      await createdDocument.save(options)
    ).toJSON() as unknown as TDocument;
  }

  async findById(id: string): Promise<TDocument> {
    const document = await this.model.findById(id, {}, { lean: true });
    
    if (!document) {
      this.logger.warn(`Document not found with id: ${id}`);
      throw new NotFoundException('Document not found.');
    }

    return document as TDocument;
  }

  async findOne(
    filterQuery: FilterQuery<TDocument>,
    projection: ProjectionType<TDocument> = {},
  ): Promise<TDocument> {
    const document = await this.model.findOne(filterQuery, projection, { lean: true });

    if (!document) {
      this.logger.warn(`Document not found with filter: ${JSON.stringify(filterQuery)}`);
      throw new NotFoundException('Document not found.');
    }

    return document as TDocument;
  }

  async findOneAndUpdate(
    filterQuery: FilterQuery<TDocument>,
    update: UpdateQuery<TDocument>,
  ): Promise<TDocument> {
    const document = await this.model.findOneAndUpdate(filterQuery, update, {
      lean: true,
      new: true,
    });

    if (!document) {
      this.logger.warn(`Document not found with filter: ${JSON.stringify(filterQuery)}`);
      throw new NotFoundException('Document not found.');
    }

    return document as TDocument;
  }

  async upsert(
    filterQuery: FilterQuery<TDocument>,
    document: Partial<TDocument>,
  ): Promise<TDocument> {
    return this.model.findOneAndUpdate(filterQuery, document, {
      lean: true,
      upsert: true,
      new: true,
    }) as Promise<TDocument>;
  }

  async find(filterQuery: FilterQuery<TDocument>): Promise<TDocument[]> {
    return this.model.find(filterQuery, {}, { lean: true }) as Promise<TDocument[]>;
  }
  async delete(filterQuery: FilterQuery<TDocument>): Promise<DeleteResult> {
    return this.model.deleteOne(filterQuery);
  }

  async startTransaction(): Promise<ClientSession> {
    const session = await this.connection.startSession();
    session.startTransaction();
    return session;
  }
}
