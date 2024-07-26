import { Module } from '@nestjs/common';
import { ReservationsModule } from 'src/reservations/reservations.module';
import { RoomsModule } from 'src/rooms/rooms.module';
import { CommandModule } from 'nestjs-command';
import { DatabaseSeedCommand } from './seed.command';
import { SeedService } from './seed.service';

@Module({
    imports: [ReservationsModule, RoomsModule, CommandModule],
    providers: [DatabaseSeedCommand, SeedService],
})
export class SeedModule {}
