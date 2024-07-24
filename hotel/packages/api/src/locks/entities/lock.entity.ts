import { ObjectType, Field, Int, ID } from '@nestjs/graphql';
import { Column, Entity, ObjectIdColumn } from 'typeorm';

@ObjectType()
export class LockChange {

  @Field(() => ID, { description: 'The id of the customer' })
  customerId: string;

  @Field(() => ID, { description: 'The id of the room' })
  roomId: string;

  @Field(() => Boolean, { description: 'The status of the lock' })
  isLocked: boolean;

  @Field(() => Date, { description: 'The time of the lock change' })
  time: Date;
}


@Entity()
@ObjectType()
export class Lock {

  @ObjectIdColumn()
  @Field(() => ID, { description: 'The id of the lock' })
  id: string;

  @Column()
  @Field(() => ID, { description: 'the id of the room' })
  roomId: string;

  @Column()
  @Field(() => Boolean, { description: 'The status of the lock' })
  isLocked: boolean;

  @Column()
  @Field(() => [LockChange], { description: 'The history of lock changes' })
  lockHistory: LockChange[];
}
