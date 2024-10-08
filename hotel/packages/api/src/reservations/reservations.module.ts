import { Module } from '@nestjs/common';
import { ReservationsService } from './reservations.service';
import { ReservationsResolver } from './reservations.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Reservation } from './entities/reservation.entity';
import { RoomsModule } from 'src/rooms/rooms.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Reservation]),
    RoomsModule
  ],
  providers: [ReservationsResolver, ReservationsService],
  exports: [ReservationsService]
})
export class ReservationsModule {}
