import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { AbstractDocument } from 'libs/common/database/abstract.schema';


@Schema({ versionKey: false })
export class Book extends AbstractDocument {
  @Prop()
  title: string;

  @Prop()
  author: string;

  @Prop()
  rating: number;
}

export const BookSchema = SchemaFactory.createForClass(Book);
