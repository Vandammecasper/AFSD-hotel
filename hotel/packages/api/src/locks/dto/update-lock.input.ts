import { CreateLockChangeInput } from './create-lock-change.input';
import { CreateLockInput } from './create-lock.input';
import { InputType, Field, Int, PartialType, ID } from '@nestjs/graphql';

@InputType()
export class UpdateLockInput extends PartialType(CreateLockInput) {
  @Field(() => ID, {nullable: true})
  id: string;

  @Field(() => ID, {nullable: true})
  roomId: string;

  @Field(() => ID)
  customerId: string;
}
