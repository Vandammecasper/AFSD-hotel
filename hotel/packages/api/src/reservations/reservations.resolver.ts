import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { ReservationsService } from './reservations.service';
import { Reservation } from './entities/reservation.entity';
import { CreateReservationInput } from './dto/create-reservation.input';
import { UpdateReservationInput } from './dto/update-reservation.input';
import { UserRecord } from 'firebase-admin/auth';
import { FirebaseUser } from 'src/authentication/user.decorator';
import { UseGuards } from '@nestjs/common';
import { FirebaseGuard } from 'src/authentication/guards/firebase.guard';

@Resolver(() => Reservation)
export class ReservationsResolver {
  constructor(private readonly reservationsService: ReservationsService) {}

  @Mutation(() => Reservation)
  createReservation(@Args('createReservationInput') createReservationInput: CreateReservationInput):Promise<Reservation> {
    return this.reservationsService.create(createReservationInput);
  }

  @Query(() => [Reservation], { name: 'reservations' })
  findAll() {
    return this.reservationsService.findAll();
  }

  @Query(() => Reservation, { name: 'reservation' })
  findOne(@Args('id', { type: () => String }) id: string) {
    return this.reservationsService.findOne(id);
  }

  // @UseGuards(FirebaseGuard)
  @Query(() => [Reservation], { name: 'reservationsByCustomerId' })
  findByCustomerId(@Args('uid', { type: () => String }) uid: string) {
    return this.reservationsService.findByCustomerId(uid);
  }

  @Query(() => [Reservation], { name: 'reservationsByRoomId' })
  findByRoomId(@Args('roomId', { type: () => String }) roomId: string) {
    return this.reservationsService.findByRoomId(roomId);
  }

  @Query(() => [Reservation], { name: 'notCheckedInReservationsOfToday' })
  findNotCheckedInReservationsOfToday() {
    return this.reservationsService.findNotCheckedInReservationsOfToday();
  }

  @Query(() => [Reservation], { name: 'nextReservationsOfRoom' })
  findNextReservationsOfRoom(@Args('roomId', { type: () => String }) roomId: string) {
    return this.reservationsService.findNextReservationsByRoomId(roomId);
  }

  @Mutation(() => Reservation)
  updateReservation(@Args('updateReservationInput') updateReservationInput: UpdateReservationInput) {
    return this.reservationsService.update(updateReservationInput.id, updateReservationInput);
  }

  @Mutation(() => Reservation)
  checkInReservation(@Args('id', { type: () => String }) id: string) {
    return this.reservationsService.checkIn(id);
  }

  @Mutation(() => Reservation, { name: 'removeReservation' })
  removeReservation(@Args('id', { type: () => String }) id: string) {
    return this.reservationsService.remove(id);
  }
}
