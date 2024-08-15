import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { RoomsService } from './rooms.service';
import { CreateRoomInput } from './dto/create-room.input';
import { UpdateRoomInput } from './dto/update-room.input';
import { ChangeLockInput } from './dto/change-lock.input';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';

@ApiTags('rooms')
@Controller('rooms')
export class RoomsController {
  constructor(private readonly roomsService: RoomsService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new room' })
  @ApiResponse({ status: 201, description: 'The room has been successfully created.' })
  create(@Body() createRoomInput: CreateRoomInput) {
    return this.roomsService.create(createRoomInput);
  }

  @Get()
  @ApiOperation({ summary: 'Get all rooms' })
  @ApiResponse({ status: 200, description: 'Returns all rooms.' })
  findAll() {
    return this.roomsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a room by ID' })
  @ApiParam({ name: 'id', description: 'Room ID' })
  @ApiResponse({ status: 200, description: 'Returns a room.' })
  findOne(@Param('id') id: string) {
    return this.roomsService.findOne(id);
  }

  @Patch()
  @ApiOperation({ summary: 'Update a room' })
  @ApiResponse({ status: 200, description: 'The room has been successfully updated.' })
  update(@Body() updateRoomInput: UpdateRoomInput) {
    return this.roomsService.update(updateRoomInput);
  }

  @Patch(':id/lock')
  @ApiOperation({ summary: 'Toggle room lock status' })
  @ApiParam({ name: 'id', description: 'Room ID' })
  @ApiResponse({ status: 200, description: 'The lock status has been changed.' })
  lockChange(@Param('id') id: string, @Body() changeLockInput: ChangeLockInput) {
    return this.roomsService.lockChange(id, changeLockInput.customerId);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a room' })
  @ApiParam({ name: 'id', description: 'Room ID' })
  @ApiResponse({ status: 200, description: 'The room has been deleted.' })
  remove(@Param('id') id: string) {
    return this.roomsService.remove(id);
  }

  @Delete()
  @ApiOperation({ summary: 'Delete all rooms' })
  @ApiResponse({ status: 200, description: 'All rooms have been deleted.' })
  deleteAll() {
    return this.roomsService.deleteAll();
  }
}
