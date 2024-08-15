import { InputType, Field, ID } from '@nestjs/graphql';
import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsString } from 'class-validator';

@InputType()
export class ChangeLockInput {
    @ApiProperty({ description: 'Id of the room' })
    @IsString()
    @Field(() => ID)
    roomId: string

    @ApiProperty({ description: 'Lock status of the room' })
    @IsBoolean()
    @Field(() => Boolean, {nullable: true})
    isLocked: boolean;
    
    @ApiProperty({ description: 'Id of the customer that changes the lock' })
    @Field(() => ID)
    customerId: string;
}
