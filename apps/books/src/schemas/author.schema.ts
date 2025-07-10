import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { AbstractDocument } from '@app/common/database';

@Schema({ versionKey: false })
export class Author extends AbstractDocument {
  @Prop()
  name: string;

  @Prop()
  email?: string;  
}

export const AuthorSchema = SchemaFactory.createForClass(Author);
