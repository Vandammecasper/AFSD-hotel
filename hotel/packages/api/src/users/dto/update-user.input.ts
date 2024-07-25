import { CreateUserInput } from './create-user.input';
import { InputType, Field, PartialType, ID } from '@nestjs/graphql';

@InputType()
export class UpdateUserInput extends PartialType(CreateUserInput) {

  @Field(() => String, { description: 'userName' })
  userName: string;

  @Field(() => String, { description: 'id' })
  id: string;
  
  @Field(() => ID, { description: 'uid' })
  uid: string;
}
