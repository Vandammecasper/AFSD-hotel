import { InputType, Field, ID } from '@nestjs/graphql';
import { IsBoolean } from 'class-validator';

@InputType()
export class CreateUserInput {
  @Field(() => String, { description: 'userName' })
  userName: string;

  @Field(() => ID, { description: 'uid' })
  uid: string;
}
