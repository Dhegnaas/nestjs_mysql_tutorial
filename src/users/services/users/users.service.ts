import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../../../Typeorm/entities/User';
import { Repository } from 'typeorm';
import { CreateUserParams } from 'src/utils/types';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User) private userRepository: Repository<User>,
    ){}

    findUsers() {}

    createUser(UserDetails: CreateUserParams) {
        const newUser = this.userRepository.create({
            ...UserDetails,
            createdAt: new Date(),
        });
        return this.userRepository.save(newUser);
    }
}
