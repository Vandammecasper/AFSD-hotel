import { InputType, Field, ID } from '@nestjs/graphql';
import { IsString } from 'class-validator';

@InputType()
export class CreateLockChangeInput {

    @IsString()
    @Field(() => ID, { description: 'The id of the customer who changed the lock' })
    customerId: string;

    @IsString()
    @Field(() => ID, { description: 'The id of the room' })
    roomId: string;

    @Field(() => Boolean, { description: 'The status of the lock' })
    isLocked: boolean;

    @Field(() => Date, { description: 'The time of the lock change' })
    time: Date;
}
