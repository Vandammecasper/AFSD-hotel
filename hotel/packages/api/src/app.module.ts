import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReservationsModule } from './reservations/reservations.module';
import { RoomsModule } from './rooms/rooms.module';
import { SeedModule } from './seed/seed.module';
import { UsersModule } from './users/users.module';
import { MongoMemoryServer } from 'mongodb-memory-server';
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
  TypeOrmModule.forRootAsync({
      useFactory: async () => {
        if (process.env.FIREBASE_AUTH_EMULATOR_HOST) {
          const mongo = await MongoMemoryServer.create({
            instance: {
              dbName: process.env.DB_NAME,
            },
          })

          const mongoUri = mongo.getUri()
          console.log('🍃 mongoUri', mongoUri)

          return {
            type: 'mongodb',
            url: `${mongoUri}${process.env.DB_NAME}`,
            entities: [__dirname + '/**/*.entity.{js,ts}'],
            synchronize: process.env.NODE_ENV == 'production' ? false : true, // Careful with this in production
            useNewUrlParser: true,
            useUnifiedTopology: true, // Disable deprecated warnings
          }
        } else {
          return {
            type: 'mongodb',
            url: `mongodb://localhost:27027/api`, // DOCKER
            entities: [__dirname + '/**/*.entity.{js,ts}'],
            synchronize: true, // Careful with this in production
            useNewUrlParser: true,
            useUnifiedTopology: true, // Disable deprecated warnings
          }
        }
      },
    }),
  RoomsModule,
  ReservationsModule,
  SeedModule,
  UsersModule,
  AuthenticationModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
