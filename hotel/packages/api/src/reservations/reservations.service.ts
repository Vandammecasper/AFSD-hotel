import { Injectable } from '@nestjs/common';
import { CreateReservationInput } from './dto/create-reservation.input';
import { UpdateReservationInput } from './dto/update-reservation.input';
import { InjectRepository } from '@nestjs/typeorm';
import { Reservation } from './entities/reservation.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ReservationsService {

  constructor(
    @InjectRepository(Reservation)
    private readonly reservationRepository: Repository<Reservation>
  ){}

  create(createReservationInput: CreateReservationInput):Promise<Reservation> {
    const r = new Reservation();
    r.roomId = createReservationInput.roomId;
    r.reservationName = createReservationInput.reservationName;
    r.customerIds = createReservationInput.customerIds;
    r.checkInDate = createReservationInput.checkInDate;
    r.checkOutDate = createReservationInput.checkOutDate;
    r.price = createReservationInput.price;
    return this.reservationRepository.save(r);
  }

  findAll() {
    return `This action returns all reservations`;
  }

  findOne(id: number) {
    return `This action returns a #${id} reservation`;
  }

  update(id: number, updateReservationInput: UpdateReservationInput) {
    return `This action updates a #${id} reservation`;
  }

  remove(id: number) {
    return `This action removes a #${id} reservation`;
  }
}
