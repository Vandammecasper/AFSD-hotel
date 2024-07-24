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
    private readonly reservationRepository: Repository<Lock>
  ){}

  create(createLockInput: CreateLockInput):Promise<Lock> {
    const l = new Lock();
    l.roomId = createLockInput.roomId;
    l.isLocked = createLockInput.isLocked;
    l.lockHistory = createLockInput.lockHistory;
    
    return this.reservationRepository.save(l);
  }

  findAll() {
    return `This action returns all locks`;
  }

  findOne(id: number) {
    return `This action returns a #${id} lock`;
  }

  async lockChange(roomId: string, customerId: string) {
    const lock = await this.reservationRepository.findOneBy({roomId});
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

    return this.reservationRepository.save(lock);
  }

  remove(id: number) {
    return `This action removes a #${id} lock`;
  }
}
