import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { AbstractDocument } from 'libs/common/database/abstract.schema';
import mongoose from 'mongoose';
import { Author } from './author.schema';

@Schema({ versionKey: false })
export class Book extends AbstractDocument {
  @Prop()
  title: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Author' })
  author: Author;

  @Prop()
  rating: number;
}

export const BookSchema = SchemaFactory.createForClass(Book);
