import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateReservationInput } from './dto/create-reservation.input';
import { UpdateReservationInput } from './dto/update-reservation.input';
import { InjectRepository } from '@nestjs/typeorm';
import { Reservation } from './entities/reservation.entity';
import { Repository } from 'typeorm';
import { ObjectId } from 'mongodb';
import { Room } from 'src/rooms/entities/room.entity';
import { RoomsService } from 'src/rooms/rooms.service';
import { In } from 'typeorm';

@Injectable()
export class ReservationsService {

  constructor(
    @InjectRepository(Reservation)
    private readonly reservationRepository: Repository<Reservation>,
    private readonly RoomsService: RoomsService
  ){}

  async create(createReservationInput: CreateReservationInput):Promise<Reservation> {
    let room  = new Room();
    room = await this.RoomsService.findOne(createReservationInput.roomId);
    if (!room) {
      throw new NotFoundException(`Room with ID "${createReservationInput.roomId}" not found`);
    }
    const r = new Reservation();
    r.roomId = createReservationInput.roomId;
    r.reservationName = createReservationInput.reservationName;
    r.customerIds = createReservationInput.customerIds;
    r.checkInDate = createReservationInput.checkInDate;
    r.checkOutDate = createReservationInput.checkOutDate;

    // the price is equal to the price of the room multiplied by the number of nights between the check-in and check-out dates
    r.price =(r.checkOutDate.getDate() - r.checkInDate.getDate()) * room.price;
    return this.reservationRepository.save(r);
  }

  findAll() {
    return this.reservationRepository.find();
  }

  findOne(id: string) {
    //@ts-ignore
    return this.reservationRepository.findOne({ _id: new ObjectId(id) });
  }

  async findByCustomerId(uid: string):Promise<Reservation[]> {
    const reservations = await this.reservationRepository.find();

    const reservationsByCustomer = [];
    for (const reservation of reservations) {
      for(const customerId of reservation.customerIds){
        if (customerId === uid) {
          reservationsByCustomer.push(reservation);
        }
      }
    }
    return reservationsByCustomer;
  }

  async findByRoomId(roomId: string):Promise<Reservation[]> {
    return this.reservationRepository.find({ where: { roomId } });
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

  remove(id: string) {
    return `This action removes a #${id} reservation`;
  }

  deleteAll() {
    return this.reservationRepository.clear();
  }
}
