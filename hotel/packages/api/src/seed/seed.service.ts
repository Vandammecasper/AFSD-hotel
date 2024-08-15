import { Injectable } from '@nestjs/common';
import * as rooms from './data/rooms.json';
import * as users from './data/users.json';
import { ReservationsService } from 'src/reservations/reservations.service';
import { RoomsService } from 'src/rooms/rooms.service';
import { CreateRoomInput } from 'src/rooms/dto/create-room.input';
import { UsersService } from 'src/users/users.service';
import { CreateUserInput } from 'src/users/dto/create-user.input';


@Injectable()
export class SeedService {
    constructor(
        private roomsService: RoomsService,
        private reservationsService: ReservationsService,
        private usersService: UsersService
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

    async addUsers(): Promise<CreateUserInput[]> {
        let theUsers: CreateUserInput[] = [];
        for (let user of users){
            const u = new CreateUserInput();
            u.email = user.email;
            u.role = user.role;
            u.uid = user.uid;
            u.userName = user.userName;

            theUsers.push(u)

            await this.usersService.create(u);

        }

        return theUsers;
    }

    async deleteAllRooms(): Promise<void> {
        return this.roomsService.deleteAll();
    }

    async deleteAllReservations(): Promise<void> {
        return this.reservationsService.deleteAll();
    }

    async deleteAllUsers(): Promise<void> {
        return this.usersService.deleteAll();
    }
}
