import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { RoomsService } from './rooms.service';
import { Room } from './entities/room.entity';
import { CreateRoomInput } from './dto/create-room.input';
import { UpdateRoomInput } from './dto/update-room.input';
import { UseGuards } from '@nestjs/common';
import { FirebaseGuard } from 'src/authentication/guards/firebase.guard';
import { ChangeLockInput } from './dto/change-lock.input';
import { NotificationsGateway } from 'src/notifications/notifications.gateway';
import { FirebaseUser } from 'src/authentication/user.decorator';
import { UserRecord } from 'firebase-admin/auth';

@Resolver(() => Room)
export class RoomsResolver {
  constructor(
    private readonly roomsService: RoomsService,
    private readonly gateway: NotificationsGateway,
  ) {}

  @Mutation(() => Room, {description: 'Create a new room using DTO'})
  createRoom(@Args('createRoomInput') createRoomInput: CreateRoomInput,
  ): Promise<Room> {
    return this.roomsService.create(createRoomInput);
  }

  @Query(() => [Room], { name: 'rooms' })
  findAll() {
    return this.roomsService.findAll();
  }

  // @UseGuards(FirebaseGuard)
  @Query(() => Room, { name: 'room' })
  findOne(@Args('id', { type: () => String }) id: string) {
    return this.roomsService.findOne(id);
  }

  @Mutation(() => Room)
  updateRoom(@Args('updateRoomInput') updateRoomInput: UpdateRoomInput): Promise<Room> {
    return this.roomsService.update(updateRoomInput);
  }

  @Mutation(() => Room)
  async lockChange(@Args('changeLockInput') ChangeLockInput: ChangeLockInput,
  ): Promise<Room> {
    const lockChange = await this.roomsService.lockChange(ChangeLockInput.roomId, ChangeLockInput.customerId);

    this.gateway.sendNewLockChange(lockChange);

    return lockChange;
  }

  @Mutation(() => Room)
  removeRoom(@Args('id', { type: () => String }) id: string) {
    return this.roomsService.remove(id);
  }
}
