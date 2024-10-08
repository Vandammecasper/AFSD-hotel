import { ObjectType, Field, ID } from '@nestjs/graphql';
import { Column, CreateDateColumn, Entity, ObjectIdColumn, UpdateDateColumn } from 'typeorm';

export enum Role {
  SUPER_ADMIN = 'SUPER_ADMIN',
  ADMIN = 'ADMIN',
  USER = 'USER',
}

@Entity()
@ObjectType()
export class User {

  @ObjectIdColumn()
  @Field(() => ID)
  id: string;

  @Column()
  @Field(() => String)
  uid: string;

  @Column()
  @Field(() => String)
  userName: string;

  @Column()
  @Field(() => String)
  email: string;

  @Column({ default: Role.USER })
  @Field(() => String)
  role: Role;
}
