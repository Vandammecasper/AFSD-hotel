import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateLockInput } from './dto/create-lock.input';
import { UpdateLockInput } from './dto/update-lock.input';
import { Lock, LockChange } from './entities/lock.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class LocksService {

  constructor(
    @InjectRepository(Lock)
    private readonly locksRepository: Repository<Lock>
  ){}

  create(createLockInput: CreateLockInput):Promise<Lock> {
    const l = new Lock();
    l.roomId = createLockInput.roomId;
    l.isLocked = true;
    l.lockHistory = [];
    
    return this.locksRepository.save(l);
  }

  findAll() {
    return this.locksRepository.find();
  }

  findOne(id: string) {
    return this.locksRepository.findOneBy({ id });
  }

  async lockChange(roomId: string, customerId: string) {
    const lock = await this.locksRepository.findOneBy({roomId});
    if (!lock) {
      throw new NotFoundException(`Lock with ID "${roomId}" not found`);
    }

    const lockChange = new LockChange();
    lockChange.customerId = customerId;
    lockChange.roomId = lock.roomId;
    lockChange.isLocked = !lock.isLocked;
    lockChange.time = new Date();

    if (lock.lockHistory == null) {
      lock.lockHistory = []
    }
    lock.lockHistory = [...lock.lockHistory, lockChange];
    lock.isLocked = lockChange.isLocked;

    return this.locksRepository.save(lock);
  }

  remove(id: number) {
    return `This action removes a #${id} lock`;
  }

  deleteAll() {
    return this.locksRepository.clear();
  }
}
