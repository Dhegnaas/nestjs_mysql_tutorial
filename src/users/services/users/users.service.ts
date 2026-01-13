import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../../../Typeorm/entities/User';
import { Repository } from 'typeorm';
import { CreateUserParams, CreateUserProfileParams, UpdateUserParams } from 'src/utils/types';
import { UpdateUserDto } from '../../dtos/UpdateUser.dto';
import { Profile } from 'src/Typeorm/entities/Profile';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>,

        @InjectRepository(Profile)
        private profileRepository: Repository<Profile>,
    ) { }

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

    async createUserProfile(
        id: number,
        createUserProfileDetailes: CreateUserProfileParams,
    ) {
        const user = await this.userRepository.findOne({
            where: { id },
            relations: ['profile'],
        });

        if (!user) {
            throw new HttpException(
                'User not found. Cannot create Profile',
                HttpStatus.BAD_REQUEST,
            );
        }

        const newProfile = this.profileRepository.create(createUserProfileDetailes);
        newProfile.user = user;

        return this.profileRepository.save(newProfile);
    }
}