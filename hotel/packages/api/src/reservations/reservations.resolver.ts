import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { ReservationsService } from './reservations.service';
import { Reservation } from './entities/reservation.entity';
import { CreateReservationInput } from './dto/create-reservation.input';
import { UpdateReservationInput } from './dto/update-reservation.input';

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

  @Query(() => [Reservation], { name: 'reservationsByCustomerId' })
  findByCustomerId(@Args('customerId', { type: () => String }) customerId: string) {
    return this.reservationsService.findByCustomerId(customerId);
  }

  @Mutation(() => Reservation)
  updateReservation(@Args('updateReservationInput') updateReservationInput: UpdateReservationInput) {
    return this.reservationsService.update(updateReservationInput.id, updateReservationInput);
  }

  @Mutation(() => Reservation)
  removeReservation(@Args('id', { type: () => String }) id: string) {
    return this.reservationsService.remove(id);
  }
}
