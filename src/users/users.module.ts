import { Module } from '@nestjs/common';
import { UsersController } from './controllers/users/users.controller';
import { UsersService } from './services/users/users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../Typeorm/entities/User';
import { Profile } from 'src/Typeorm/entities/Profile';

@Module({
  imports: [TypeOrmModule.forFeature([User, Profile])],
  controllers: [UsersController],
  providers: [UsersService]
})
export class UsersModule {}
