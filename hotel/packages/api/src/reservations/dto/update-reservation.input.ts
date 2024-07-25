import { CreateReservationInput } from './create-reservation.input';
import { InputType, Field, Int, PartialType, ID } from '@nestjs/graphql';

@InputType()
export class UpdateReservationInput extends PartialType(CreateReservationInput) {
  @Field(() => ID)
  id: string;

  @Field(() => ID)
  roomId: string;

  @Field(() => String)
  reservationName: string;

  @Field(() => [ID])
  customerIds: string[];

  @Field(() => Date)
  checkInDate: Date;

  @Field(() => Date)
  checkOutDate: Date;
}
