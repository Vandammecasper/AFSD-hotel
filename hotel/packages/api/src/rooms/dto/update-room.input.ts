import { CreateRoomInput } from './create-room.input';
import { InputType, Field, Int, PartialType, ID } from '@nestjs/graphql';

@InputType()
export class UpdateRoomInput extends PartialType(CreateRoomInput) {
  @Field(() => ID)
  id: string;

  @Field(() => String)
  roomName: string;

  @Field(() => Int)
  roomNumber: number;

  @Field(() => Int)
  price: number;

  @Field(() => Int)
  maxOccupation: number;

  @Field(() => Int)
  size: number;

  @Field(() => [String])
  facilities: string[];

  @Field(() => String)
  description: string;

  @Field(() => String)
  roomPicture: string;
}
