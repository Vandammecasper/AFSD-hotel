import { InputType, Int, Field, ID } from '@nestjs/graphql';
import { ArrayNotEmpty, IsBoolean, IsNumber, IsString } from 'class-validator';
import { boolean } from 'yargs';
import { LockChange } from '../entities/room.entity';
import { ChangeLockInput } from './change-lock.input';

@InputType()
export class CreateRoomInput {
  @IsBoolean()
  @Field(() => Boolean)
  isLocked: boolean;
  
  @Field(() => [ChangeLockInput])
  lockHistory: ChangeLockInput[];

  @IsString()
  @Field(() => String)
  roomName: string;

  @IsNumber()
  @Field(() => Int)
  roomNumber: number;

  @IsNumber()
  @Field(() => Int)
  price: number;

  @IsNumber()
  @Field(() => Int)
  maxOccupation: number;

  @IsNumber()
  @Field(() => Int)
  size: number;

  @ArrayNotEmpty()
  @Field(() => [String])
  facilities: string[];

  @IsString()
  @Field(() => String)
  description: string;

  @IsString()
  @Field(() => String)
  roomPicture: string;
}
