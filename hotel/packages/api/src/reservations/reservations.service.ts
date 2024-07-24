import { Injectable, NotFoundException } from '@nestjs/common';
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

  async update(id: string, updateReservationInput: UpdateReservationInput):Promise<Reservation> {
    const result = await this.reservationRepository.update(id, updateReservationInput);

    if (result.affected === 0) {
      throw new NotFoundException(`Reservation with ID "${id}" not found`);
    }

    const updatedReservation = this.reservationRepository.findOneBy({ id });
    if (!updatedReservation) {
      throw new NotFoundException(`Reservation with ID "${id}" not found`);
    }

    return updatedReservation;
  }

  remove(id: number) {
    return `This action removes a #${id} reservation`;
  }
}
