import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReservationsModule } from './reservations/reservations.module';
import { RoomsModule } from './rooms/rooms.module';
import { LocksModule } from './locks/locks.module';
import { SeedModule } from './seed/seed.module';
import { UsersModule } from './users/users.module';
import { AuthenticationModule } from './authentication/authentication.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
        type: 'mongodb',
        url: `mongodb://localhost:27027/api`,
        entities: [__dirname + '/**/*.entity.{js,ts}'],
        synchronize: true, // Careful with this in production
        useNewUrlParser: true,
        useUnifiedTopology: true, // Disable deprecated warnings
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
    driver: ApolloDriver,
    autoSchemaFile: true,
  }),
  RoomsModule,
  ReservationsModule,
  LocksModule,
  SeedModule,
  UsersModule,
  AuthenticationModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
