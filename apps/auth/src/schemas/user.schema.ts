import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { AbstractDocument } from '@app/common/database';

@Schema({ versionKey: false })
export class User extends AbstractDocument {
  @Prop()
  firstname: string;

  @Prop()
  lastname: string;  

  @Prop()
  email: string;

  @Prop()
  password: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
