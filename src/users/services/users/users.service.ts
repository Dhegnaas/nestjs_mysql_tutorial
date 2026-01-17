import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../../../Typeorm/entities/User';
import { Profile } from 'src/Typeorm/entities/Profile';
import { Post } from 'src/Typeorm/entities/Post';
import { 
    CreateUserParams, 
    CreateUserProfileParams, 
    UpdateUserParams, 
    CreateUserPostParams 
} from 'src/utils/types';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>,

        @InjectRepository(Profile)
        private profileRepository: Repository<Profile>,

        @InjectRepository(Post)
        private postRepository: Repository<Post>,
    ) {}

    findUsers() {
        return this.userRepository.find({ relations: ['profile', 'posts'] });
    }

    createUser(userDetails: CreateUserParams) {
        const newUser = this.userRepository.create({
            ...userDetails,
            createdAt: new Date(),
        });
        return this.userRepository.save(newUser);
    }

    updateUser(id: number, updateUserDetails: UpdateUserParams) {
        return this.userRepository.update({ id }, { ...updateUserDetails });
    }

    deleteUser(id: number) {
        return this.userRepository.delete({ id });
    }

    async createUserProfile(
        id: number,
        createUserProfileDetails: CreateUserProfileParams,
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

        const newProfile = this.profileRepository.create(createUserProfileDetails);
        const savedProfile = await this.profileRepository.save(newProfile);

        user.profile = savedProfile;
        return this.userRepository.save(user);
    }

    async createUserPost(
        id: number,
        createUserPostDetails: CreateUserPostParams,
    ) {
        const user = await this.userRepository.findOneBy({ id });

        if (!user) {
            throw new HttpException(
                'User not found. Cannot create Post',
                HttpStatus.BAD_REQUEST,
            );
        }

        const newPost = this.postRepository.create({
            ...createUserPostDetails,
            user,
        });

        return this.postRepository.save(newPost);
    }
}
