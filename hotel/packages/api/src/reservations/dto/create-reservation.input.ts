import { InputType, Int, Field, ID } from '@nestjs/graphql';
import { ArrayNotEmpty, IsDate, IsNumber, IsString } from 'class-validator';

@InputType()
export class CreateReservationInput {
  @IsString()
  @Field(() => ID, { description: 'The id of the room on the reservation' })
  roomId: string;

  @IsString()
  @Field(() => String, { description: 'The name on the reservation' })
  reservationName: string;

  @ArrayNotEmpty()
  @Field(() => [ID], { description: 'The id of the customers on the reservation' })
  customerIds: string[];

  @IsDate()
  @Field(() => Date, { description: 'The check-in date of the reservation' })
  checkInDate: Date;

  @IsDate()
  @Field(() => Date, { description: 'The check-out date of the reservation' })
  checkOutDate: Date;

  @IsNumber()
  @Field(() => Int, { description: 'The total price of the reservation' })
  price: number;
}
