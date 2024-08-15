import { ApiProperty } from '@nestjs/swagger';
import { CreateRoomInput } from './create-room.input';
import { InputType, Field, Int, PartialType, ID } from '@nestjs/graphql';

@InputType()
export class UpdateRoomInput extends PartialType(CreateRoomInput) {
  @ApiProperty({ description: 'Id of the room' })
  @Field(() => ID)
  id: string;

  @ApiProperty({ description: 'Name of the room' })
  @Field(() => String)
  roomName: string;

  @ApiProperty({ description: 'Number of the room' })
  @Field(() => Int)
  roomNumber: number;

  @ApiProperty({ description: 'Price of the room' })
  @Field(() => Int)
  price: number;

  @ApiProperty({ description: 'Maximum occupation of the room' })
  @Field(() => Int)
  maxOccupation: number;

  @ApiProperty({ description: 'Size of the room' })
  @Field(() => Int)
  size: number;

  @ApiProperty({ description: 'Facilities of the room' })
  @Field(() => [String])
  facilities: string[];

  @ApiProperty({ description: 'Description of the room' })
  @Field(() => String)
  description: string;

  @ApiProperty({ description: 'Picture of the room' })
  @Field(() => String)
  roomPicture: string;
}
