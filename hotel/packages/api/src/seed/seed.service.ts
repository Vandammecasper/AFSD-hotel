import { Injectable } from '@nestjs/common';

import * as rooms from './data/rooms.json';
import * as reservations from './data/reservations.json';
import * as locks from './data/locks.json';
import { LocksService } from 'src/locks/locks.service';
import { ReservationsService } from 'src/reservations/reservations.service';
import { RoomsService } from 'src/rooms/rooms.service';
import { Room } from 'src/rooms/entities/room.entity';
import { CreateRoomInput } from 'src/rooms/dto/create-room.input';
import { CreateLockInput } from 'src/locks/dto/create-lock.input';


@Injectable()
export class SeedService {
    constructor(
        private roomsService: RoomsService,
        private reservationsService: ReservationsService,
        private locksService: LocksService
    ) {}

    async addRooms(): Promise<CreateRoomInput[]> {
        let theRooms: CreateRoomInput[] = [];
        for (let room of rooms){
            const r = new CreateRoomInput();
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

    async addLocks(): Promise<CreateLockInput[]> {
        let theLocks: CreateLockInput[] = [];
        for (let lock of locks){
            const l = new CreateLockInput();
            l.roomId = lock.roomId;
            l.isLocked = lock.isLocked
            
            theLocks.push(l)

            await this.locksService.create(l);
        }

        return theLocks;
    }

    async deleteAllLocks(): Promise<void> {
        return this.locksService.deleteAll();
    }

    async deleteAllReservations(): Promise<void> {
        return this.reservationsService.deleteAll();
    }
}
