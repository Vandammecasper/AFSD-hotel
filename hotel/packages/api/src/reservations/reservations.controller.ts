import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ReservationsService } from './reservations.service';
import { CreateReservationInput } from './dto/create-reservation.input';
import { UpdateReservationInput } from './dto/update-reservation.input';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';

@ApiTags('reservations')
@Controller('reservations')
export class ReservationsController {
  constructor(private readonly reservationsService: ReservationsService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new reservation' })
  @ApiResponse({ status: 201, description: 'The reservation has been successfully created.' })
  create(@Body() createReservationInput: CreateReservationInput) {
    return this.reservationsService.create(createReservationInput);
  }

  @Get()
  @ApiOperation({ summary: 'Get all reservations' })
  @ApiResponse({ status: 200, description: 'Returns all reservations.' })
  findAll() {
    return this.reservationsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a reservation by ID' })
  @ApiParam({ name: 'id', description: 'Reservation ID' })
  @ApiResponse({ status: 200, description: 'Returns a reservation.' })
  findOne(@Param('id') id: string) {
    return this.reservationsService.findOne(id);
  }

  @Get('customer/:uid')
  @ApiOperation({ summary: 'Get reservations by customer ID' })
  @ApiParam({ name: 'uid', description: 'Customer ID' })
  @ApiResponse({ status: 200, description: 'Returns reservations by customer ID.' })
  findByCustomerId(@Param('uid') uid: string) {
    return this.reservationsService.findByCustomerId(uid);
  }

  @Get('room/:roomId')
  @ApiOperation({ summary: 'Get reservations by room ID' })
  @ApiParam({ name: 'roomId', description: 'Room ID' })
  @ApiResponse({ status: 200, description: 'Returns reservations by room ID.' })
  findByRoomId(@Param('roomId') roomId: string) {
    return this.reservationsService.findByRoomId(roomId);
  }

  @Get('today/not-checked-in')
  @ApiOperation({ summary: 'Get reservations of today that are not checked in' })
  @ApiResponse({ status: 200, description: 'Returns not checked-in reservations of today.' })
  findNotCheckedInReservationsOfToday() {
    return this.reservationsService.findNotCheckedInReservationsOfToday();
  }

  @Get('room/:roomId/next')
  @ApiOperation({ summary: 'Get next reservations for a room' })
  @ApiParam({ name: 'roomId', description: 'Room ID' })
  @ApiResponse({ status: 200, description: 'Returns next reservations for a room.' })
  findNextReservationsByRoomId(@Param('roomId') roomId: string) {
    return this.reservationsService.findNextReservationsByRoomId(roomId);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a reservation' })
  @ApiParam({ name: 'id', description: 'Reservation ID' })
  @ApiResponse({ status: 200, description: 'The reservation has been successfully updated.' })
  update(@Param('id') id: string, @Body() updateReservationInput: UpdateReservationInput) {
    return this.reservationsService.update(id, updateReservationInput);
  }

  @Patch(':id/check-in')
  @ApiOperation({ summary: 'Check in to a reservation' })
  @ApiParam({ name: 'id', description: 'Reservation ID' })
  @ApiResponse({ status: 200, description: 'The reservation has been checked in.' })
  checkIn(@Param('id') id: string) {
    return this.reservationsService.checkIn(id);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a reservation' })
  @ApiParam({ name: 'id', description: 'Reservation ID' })
  @ApiResponse({ status: 200, description: 'The reservation has been deleted.' })
  remove(@Param('id') id: string) {
    return this.reservationsService.remove(id);
  }

  @Delete()
  @ApiOperation({ summary: 'Delete all reservations' })
  @ApiResponse({ status: 200, description: 'All reservations have been deleted.' })
  deleteAll() {
    return this.reservationsService.deleteAll();
  }
}
