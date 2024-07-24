import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { LocksService } from './locks.service';
import { Lock } from './entities/lock.entity';
import { CreateLockInput } from './dto/create-lock.input';
import { UpdateLockInput } from './dto/update-lock.input';

@Resolver(() => Lock)
export class LocksResolver {
  constructor(private readonly locksService: LocksService) {}

  @Mutation(() => Lock)
  createLock(@Args('createLockInput') createLockInput: CreateLockInput): Promise<Lock> {
    return this.locksService.create(createLockInput);
  }

  @Query(() => [Lock], { name: 'locks' })
  findAll() {
    return this.locksService.findAll();
  }

  @Query(() => Lock, { name: 'lock' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.locksService.findOne(id);
  }

  @Mutation(() => Lock)
  updateLock(@Args('updateLockInput') updateLockInput: UpdateLockInput):Promise<Lock> {
    return this.locksService.lockChange(updateLockInput.roomId, updateLockInput.customerId);
  }

  @Mutation(() => Lock)
  removeLock(@Args('id', { type: () => Int }) id: number) {
    return this.locksService.remove(id);
  }
}
