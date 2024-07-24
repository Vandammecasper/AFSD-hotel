import { ObjectType, Field, Int, ID } from '@nestjs/graphql';
import { Column, Entity, ObjectIdColumn } from 'typeorm';

@Entity()
@ObjectType()
export class Reservation {

  @ObjectIdColumn()
  @Field(() => ID, { description: 'the id of the reservation' })
  id: string;

  @Column()
  @Field(() => ID, { description: 'the id of the room on the reservation' })
  roomId: string;

  @Column()
  @Field(() => String, { description: 'the name on the reservation' })
  reservationName: string;

  @Column()
  @Field(()=> [ID], { description: 'the id of the customers on the reservation' })
  customerIds: string[];

  @Column()
  @Field(() => Date, { description: 'the check-in date of the reservation' })
  checkInDate: Date;

  @Column()
  @Field(() => Date, { description: 'the check-out date of the reservation' })
  checkOutDate: Date;

  @Column()
  @Field(() => Int, { description: 'the total price of the reservation' })
  price: number;
}
