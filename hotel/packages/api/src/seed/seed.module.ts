import { Module } from '@nestjs/common';
import { LocksModule } from 'src/locks/locks.module';
import { ReservationsModule } from 'src/reservations/reservations.module';
import { RoomsModule } from 'src/rooms/rooms.module';
import { CommandModule } from 'nestjs-command';
import { DatabaseSeedCommand } from './seed.command';
import { SeedService } from './seed.service';

@Module({
    imports: [LocksModule, ReservationsModule, RoomsModule, CommandModule],
    providers: [DatabaseSeedCommand, SeedService],
})
export class SeedModule {}
