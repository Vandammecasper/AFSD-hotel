import { Injectable, NotFoundException, UseGuards } from '@nestjs/common';
import { CreateRoomInput } from './dto/create-room.input';
import { UpdateRoomInput } from './dto/update-room.input';
import { Repository } from 'typeorm';
import { ObjectId } from 'mongodb';
import { LockChange, Room } from './entities/room.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { ChangeLockInput } from './dto/change-lock.input';

@Injectable()
export class RoomsService {

  constructor(
    @InjectRepository(Room)
    private readonly roomRepository: Repository<Room>
  ){}

  create(createRoomInput: CreateRoomInput): Promise<Room> {
    const r = new Room();
    r.isLocked = true;
    r.lockHistory = [];
    r.roomName = createRoomInput.roomName;
    r.roomNumber = createRoomInput.roomNumber;
    r.price = createRoomInput.price;
    r.maxOccupation = createRoomInput.maxOccupation;
    r.size = createRoomInput.size;
    r.facilities = createRoomInput.facilities;
    r.description = createRoomInput.description;
    r.roomPicture = createRoomInput.roomPicture;
    return this.roomRepository.save(r);
  }

  findAll() {
    return this.roomRepository.find();
  }

  findOne(id: string) {
    //@ts-ignore
    return this.roomRepository.findOne({ _id: new ObjectId(id) });
  }

  async update(updateRoomInput: UpdateRoomInput): Promise<Room> {
    //@ts-ignore
    const room = await this.roomRepository.findOneBy({_id: new ObjectId(updateRoomInput.id)});
    if (!room) {
      throw new NotFoundException(`Room with ID "${updateRoomInput.id}" not found`);
    }

    room.roomName = updateRoomInput.roomName;
    room.roomNumber = updateRoomInput.roomNumber;
    room.price = updateRoomInput.price;
    room.maxOccupation = updateRoomInput.maxOccupation;
    room.size = updateRoomInput.size;
    room.facilities = updateRoomInput.facilities;
    room.description = updateRoomInput.description;
    room.roomPicture = updateRoomInput.roomPicture;

    return this.roomRepository.save(room);
  }

  async lockChange(roomId: string, customerId: string) {
    //@ts-ignore
    const room = await this.roomRepository.findOneBy({_id: new ObjectId(roomId)});
    if (!room) {
      throw new NotFoundException(`Room with ID "${roomId}" not found`);
    }

    room.isLocked = !room.isLocked;

    const lockChange = new LockChange();
    lockChange.customerId = customerId;
    lockChange.isLocked = room.isLocked;
    lockChange.time = new Date();

    if (!room.lockHistory) {
      room.lockHistory = [];
    }

    room.lockHistory.push(lockChange);
    return this.roomRepository.save(room);
  }

  remove(id: string) {
    return this.roomRepository.delete(id);
  }

  deleteAll() {
    return this.roomRepository.clear();
  }
}
