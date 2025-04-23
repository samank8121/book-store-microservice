import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { AbstractDocument } from 'libs/common/database/abstract.schema';

@Schema({ versionKey: false })
export class Author extends AbstractDocument {
  @Prop()
  name: string;

  @Prop()
  email?: string;  
}

export const AuthorSchema = SchemaFactory.createForClass(Author);
