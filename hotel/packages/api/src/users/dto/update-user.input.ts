import { ApiProperty } from '@nestjs/swagger';
import { CreateUserInput } from './create-user.input';
import { InputType, Field, PartialType, ID } from '@nestjs/graphql';

@InputType()
export class UpdateUserInput extends PartialType(CreateUserInput) {

  @ApiProperty({ description: 'Username of the user' })
  @Field(() => String, { description: 'userName' })
  userName: string;

  @ApiProperty({ description: 'id of the user' })
  @Field(() => String, { description: 'id' })
  id: string;
  
  @ApiProperty({ description: 'Uid from Firebase' })
  @Field(() => ID, { description: 'uid' })
  uid: string;
}
