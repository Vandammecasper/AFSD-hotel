import { InputType, Field, ID } from '@nestjs/graphql';

@InputType()
export class CreateUserInput {
  @Field(() => String, { description: 'userName' })
  userName: string;

  @Field(() => String, { description: 'email' })
  email: string;

  @Field(() => String, { description: 'uid' })
  uid: string;

  @Field(() => String, { description: 'role' })
  role: string;
}
