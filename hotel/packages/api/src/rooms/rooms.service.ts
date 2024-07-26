import { Injectable, NotFoundException, UseGuards } from '@nestjs/common';
import { CreateRoomInput } from './dto/create-room.input';
import { UpdateRoomInput } from './dto/update-room.input';
import { Repository } from 'typeorm';
import { ObjectId } from 'mongodb';
import { Room } from './entities/room.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class RoomsService {

  constructor(
    @InjectRepository(Room)
    private readonly roomRepository: Repository<Room>
  ){}

  create(createRoomInput: CreateRoomInput): Promise<Room> {
    const r = new Room();
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

  async update(id: string, updateRoomInput: UpdateRoomInput): Promise<Room> {
    // Perform the update operation
    const result = await this.roomRepository.update(id, updateRoomInput);

    // Check if the update was successful
    if (result.affected === 0) {
      throw new NotFoundException(`Room with ID "${id}" not found`);
    }

    // Retrieve and return the updated entity
    const updatedRoom = await this.roomRepository.findOneBy({ id });
    if (!updatedRoom) {
      throw new NotFoundException(`Room with ID "${id}" not found`);
    }

    return updatedRoom;
  }

  remove(id: string) {
    return this.roomRepository.delete(id);
  }

  deleteAll() {
    return this.roomRepository.clear();
  }
}
