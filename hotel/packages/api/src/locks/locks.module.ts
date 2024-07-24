import { Module } from '@nestjs/common';
import { LocksService } from './locks.service';
import { LocksResolver } from './locks.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Lock } from './entities/lock.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Lock]),
  ],
  providers: [LocksResolver, LocksService],
  exports: [LocksService]
})
export class LocksModule {}
