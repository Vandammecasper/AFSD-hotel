import { Injectable } from '@nestjs/common';

import * as rooms from './data/rooms.json';
import * as reservations from './data/reservations.json';
import { ReservationsService } from 'src/reservations/reservations.service';
import { RoomsService } from 'src/rooms/rooms.service';
import { Room } from 'src/rooms/entities/room.entity';
import { CreateRoomInput } from 'src/rooms/dto/create-room.input';


@Injectable()
export class SeedService {
    constructor(
        private roomsService: RoomsService,
        private reservationsService: ReservationsService,
    ) {}

    async addRooms(): Promise<CreateRoomInput[]> {
        let theRooms: CreateRoomInput[] = [];
        for (let room of rooms){
            const r = new CreateRoomInput();
            r.isLocked = room.isLocked;
            r.lockHistory = []
            r.roomName = room.roomName;
            r.roomNumber = room.roomNumber;
            r.price = room.price;
            r.maxOccupation = room.maxOccupation;
            r.size = room.size;
            r.facilities = room.facilities;
            r.description = room.description;
            r.roomPicture = room.roomPicture;
            
            theRooms.push(r)

            await this.roomsService.create(r);

        }

        return theRooms;
    }

    async deleteAllRooms(): Promise<void> {
        return this.roomsService.deleteAll();
    }

    async deleteAllReservations(): Promise<void> {
        return this.reservationsService.deleteAll();
    }
}
