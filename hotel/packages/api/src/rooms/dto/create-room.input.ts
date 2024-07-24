import { InputType, Int, Field } from '@nestjs/graphql';
import { ArrayNotEmpty, IsNumber, IsString } from 'class-validator';

@InputType()
export class CreateRoomInput {
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
