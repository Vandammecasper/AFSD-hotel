import { ApiProperty } from '@nestjs/swagger';
import { CreateReservationInput } from './create-reservation.input';
import { InputType, Field, Int, PartialType, ID } from '@nestjs/graphql';

@InputType()
export class UpdateReservationInput extends PartialType(CreateReservationInput) {
  @ApiProperty({ description: 'Id of the reservation' })
  @Field(() => ID)
  id: string;

  @ApiProperty({ description: 'Id of the room' })
  @Field(() => ID)
  roomId: string;

  @ApiProperty({ description: 'Name of the reservation' })
  @Field(() => String)
  reservationName: string;

  @ApiProperty({ description: 'Ids of the customers' })
  @Field(() => [ID])
  customerIds: string[];

  @ApiProperty({ description: 'Check-in date of the reservation' })
  @Field(() => Date)
  checkInDate: Date;

  @ApiProperty({ description: 'Check-out date of the reservation' })
  @Field(() => Date)
  checkOutDate: Date;
}
