import { Injectable } from "@nestjs/common";
import { SeedService } from "./seed.service";
import { Command } from "nestjs-command";


@Injectable()
export class DatabaseSeedCommand {
    constructor(
        private readonly seedService: SeedService
    ) {}

    @Command({
        command: 'npx nestjs-command seed:database',
        describe: 'Reset and seed the database with data',
    })

    async seed() {
        console.info('start deleting data 🪦');
        await this.seedService.deleteAllRooms();
        console.info('deleted all rooms 🗑️');
        await this.seedService.deleteAllReservations();
        console.info('deleted all reservations 🗑️');
        await this.seedService.deleteAllUsers();
        console.info('deleted all users 🗑️');
        console.info('deleting data complete 🎉');

        console.info('start seeding data 🌱');
        const rooms = await this.seedService.addRooms();
        console.info(`${rooms.length} rooms seeded 🛏️`)
        const users = await this.seedService.addUsers();
        console.info(`${users.length} users seeded 👤`)
        console.info('seeding complete 🎉');
    }
}