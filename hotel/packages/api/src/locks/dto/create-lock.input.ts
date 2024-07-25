import { InputType, Field, ID } from '@nestjs/graphql';
import { IsBoolean, IsString } from 'class-validator';
import { CreateLockChangeInput } from './create-lock-change.input';

@InputType()
export class CreateLockInput {
  @IsString()
  @Field(() => ID, { description: 'The id of the room', nullable: false })
  roomId: string;

  @IsBoolean()
  @Field(() => Boolean, { description: 'The status of the lock', nullable: false })
  isLocked: boolean;
}
