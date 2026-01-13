import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../../../Typeorm/entities/User';
import { Repository } from 'typeorm';
import { CreateUserParams, UpdateUserParams } from 'src/utils/types';
import { UpdateUserDto } from '../../dtos/UpdateUser.dto';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User) private userRepository: Repository<User>,
    ){}

    findUsers() {
        return this.userRepository.find();
    }

    createUser(UserDetails: CreateUserParams) {
        const newUser = this.userRepository.create({
            ...UserDetails,
            createdAt: new Date(), 
        });
        return this.userRepository.save(newUser);
    }

    UpdateUser(id: number, UpdateUserDetails: UpdateUserParams) {
        return this.userRepository.update({ id }, { ...UpdateUserDetails });
    }

    deleteUser(id: number) {
        return this.userRepository.delete({ id });
    }
}
