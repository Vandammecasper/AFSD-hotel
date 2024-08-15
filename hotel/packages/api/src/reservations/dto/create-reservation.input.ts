import { InputType, Int, Field, ID } from '@nestjs/graphql';
import { ApiProperty } from '@nestjs/swagger';
import { ArrayNotEmpty, IsDate, IsNumber, IsString } from 'class-validator';

@InputType()
export class CreateReservationInput {
  @ApiProperty({ description: 'Id of the room' })
  @IsString()
  @Field(() => ID, { description: 'The id of the room on the reservation' })
  roomId: string;

  @ApiProperty({ description: 'Name of the reservation' })
  @IsString()
  @Field(() => String, { description: 'The name on the reservation' })
  reservationName: string;

  @ApiProperty({ description: 'Ids of the customers' })
  @ArrayNotEmpty()
  @Field(() => [ID], { description: 'The id of the customers on the reservation' })
  customerIds: string[];

  @ApiProperty({ description: 'Check-in date of the reservation' })
  @IsDate()
  @Field(() => Date, { description: 'The check-in date of the reservation' })
  checkInDate: Date;

  @ApiProperty({ description: 'Check-out date of the reservation' })
  @IsDate()
  @Field(() => Date, { description: 'The check-out date of the reservation' })
  checkOutDate: Date;
}
