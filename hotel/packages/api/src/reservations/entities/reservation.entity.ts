import { ObjectType, Field, Int, ID } from '@nestjs/graphql';
import { Column, Entity, ObjectIdColumn } from 'typeorm';

@Entity()
@ObjectType()
export class Reservation {

  @ObjectIdColumn()
  @Field(() => ID, { description: 'the id of the reservation', nullable: false })
  id: string;

  @Column()
  @Field(() => ID, { description: 'the id of the room on the reservation', nullable: false })
  roomId: string;

  @Column()
  @Field(() => String, { description: 'the name on the reservation', nullable: false })
  reservationName: string;

  @Column()
  @Field(()=> [String], { description: 'the id of the customers on the reservation', nullable: false })
  customerIds: string[];

  @Column()
  @Field(() => Date, { description: 'the check-in date of the reservation', nullable: false })
  checkInDate: Date;

  @Column()
  @Field(() => Date, { description: 'the check-out date of the reservation', nullable: false })
  checkOutDate: Date;

  @Column()
  @Field(() => Int, { description: 'the total price of the reservation', nullable: false })
  price: number;
}
