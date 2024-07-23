import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Column, Entity, ObjectIdColumn } from 'typeorm';
import { string } from 'yargs';

@Entity()
@ObjectType()
export class Room {

  @ObjectIdColumn()
  @Field(() => Int)
  id: number;

  @Column()
  @Field(() => String, {description: 'The name of the room', nullable: false})
  roomName: string;

  @Column()
  @Field(() => Int, {description: 'The number of the room', nullable: false})
  roomNumber: number;

  @Column()
  @Field(() => Int, {description: 'Price per night in euros', nullable: false})
  price: number;

  @Column()
  @Field(() => Int, {description: 'Maximum number of customers that can stay in that room', nullable: false})
  maxOccupation: number;

  @Column()
  @Field(() => Int, {description: 'Size of the room in m²', nullable: false})
  size: number;

  @Column()
  @Field(() => [String], {description: 'List of facilities', nullable: false})
  facilities: String[];

  @Column()
  @Field(() => String, {description: 'Description of the room', nullable: false})
  description: string;

  @Column()
  @Field(() => String, {description: 'Picture of the room', nullable: false})
  roomPicture: string;

}
