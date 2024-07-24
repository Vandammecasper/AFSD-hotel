import { ObjectType, Field, Int, ID } from '@nestjs/graphql';
import { Column, Entity, ObjectIdColumn } from 'typeorm';
import { string } from 'yargs';

@Entity()
@ObjectType()
export class Room {

  @ObjectIdColumn()
  @Field(() => ID, {description: 'The id of the room', nullable: false})
  id: string;

  @Column()
  @Field(() => String, {description: 'The name of the room', nullable: false})
  roomName: string;

  @Column()
  @Field(() => Int, {description: 'The number of the room', nullable: true})
  roomNumber: number;

  @Column()
  @Field(() => Int, {description: 'Price per night in euros', nullable: true})
  price: number;

  @Column()
  @Field(() => Int, {description: 'Maximum number of customers that can stay in that room', nullable: true})
  maxOccupation: number;

  @Column()
  @Field(() => Int, {description: 'Size of the room in m²', nullable: true})
  size: number;

  @Column()
  @Field(() => [String], {description: 'List of facilities', nullable: true})
  facilities: String[];

  @Column()
  @Field(() => String, {description: 'Description of the room', nullable: true})
  description: string;

  @Column()
  @Field(() => String, {description: 'Picture of the room', nullable: true})
  roomPicture: string;

}
