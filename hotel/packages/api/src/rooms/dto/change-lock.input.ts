import { InputType, Field, ID } from '@nestjs/graphql';
import { IsBoolean, IsString } from 'class-validator';

@InputType()
export class ChangeLockInput {
    @IsString()
    @Field(() => ID)
    roomId: string

    @IsBoolean()
    @Field(() => Boolean, {nullable: true})
    isLocked: boolean;
    
    @Field(() => ID)
    customerId: string;
}
