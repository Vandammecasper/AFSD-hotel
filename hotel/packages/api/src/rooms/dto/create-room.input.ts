import { InputType, Int, Field, ID } from '@nestjs/graphql';
import { ArrayNotEmpty, IsBoolean, IsNumber, IsString } from 'class-validator';
import { boolean } from 'yargs';
import { LockChange } from '../entities/room.entity';
import { ChangeLockInput } from './change-lock.input';
import { ApiProperty } from '@nestjs/swagger';

@InputType()
export class CreateRoomInput {
  @ApiProperty({ description: 'Status of the lock' })
  @IsBoolean()
  @Field(() => Boolean)
  isLocked: boolean;
  
  @ApiProperty({ description: 'Lock history of the room' })
  @Field(() => [ChangeLockInput])
  lockHistory: ChangeLockInput[];

  @ApiProperty({ description: 'Name of the room' })
  @IsString()
  @Field(() => String)
  roomName: string;

  @ApiProperty({ description: 'Number of the room' })
  @IsNumber()
  @Field(() => Int)
  roomNumber: number;

  @ApiProperty({ description: 'Price of the room' })
  @IsNumber()
  @Field(() => Int)
  price: number;

  @ApiProperty({ description: 'Maximum occupation of the room' })
  @IsNumber()
  @Field(() => Int)
  maxOccupation: number;

  @ApiProperty({ description: 'Size of the room' })
  @IsNumber()
  @Field(() => Int)
  size: number;

  @ApiProperty({ description: 'Facilities of the room' })
  @ArrayNotEmpty()
  @Field(() => [String])
  facilities: string[];

  @ApiProperty({ description: 'Description of the room' })
  @IsString()
  @Field(() => String)
  description: string;

  @ApiProperty({ description: 'Picture of the room' })
  @IsString()
  @Field(() => String)
  roomPicture: string;
}
