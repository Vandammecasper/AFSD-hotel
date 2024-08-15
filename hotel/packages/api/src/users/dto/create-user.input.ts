import { InputType, Field, ID } from '@nestjs/graphql';
import { ApiProperty } from '@nestjs/swagger';

@InputType()
export class CreateUserInput {
  @ApiProperty({ description: 'Username of the user' })
  @Field(() => String, { description: 'userName' })
  userName: string;

  @ApiProperty({ description: 'Email of the user' })
  @Field(() => String, { description: 'email' })
  email: string;

  @ApiProperty({ description: 'Uid from Firebase' })
  @Field(() => String, { description: 'uid' })
  uid: string;

  @ApiProperty({ description: 'Role of the user' })
  @Field(() => String, { description: 'role' })
  role: string;
}
