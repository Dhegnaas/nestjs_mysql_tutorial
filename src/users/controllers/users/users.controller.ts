import { 
    Body, 
    Controller, 
    Delete, 
    Get, 
    Param, 
    ParseIntPipe, 
    Post, 
    Put 
} from '@nestjs/common';
import { CreateUserDto } from 'src/users/dtos/CreateUser.dto';
import { UsersService } from '../../services/users/users.service';
import { UpdateUserDto } from '../../dtos/UpdateUser.dto';
import { CreateUserProfileDto } from '../../dtos/CreateUserProfile';
import { CreateUserPostDto } from 'src/users/dtos/CreateUserPost.dto';

@Controller('users')
export class UsersController {
    // Best Practice: Isticmaal camelCase 'userService'
    constructor(private readonly userService: UsersService) { }

    @Get()
    async getUsers() {
        return await this.userService.findUsers();
    }

    @Post()
    async createUser(@Body() createUserDto: CreateUserDto) {
        return await this.userService.createUser(createUserDto);
    }

    @Put(':id')
    async updateUserById(
        @Param('id', ParseIntPipe) id: number,
        @Body() updateUserDto: UpdateUserDto,
    ) {
        // Waxaa muhiim ah in 'return' la dhaho si loo arko natiijada
        return await this.userService.updateUser(id, updateUserDto);
    }

    @Delete(':id')
    async deleteUserById(@Param('id', ParseIntPipe) id: number) {
        return await this.userService.deleteUser(id);
    }

    @Post(':id/profiles')
    async createUserProfile(
        @Param('id', ParseIntPipe) id: number,
        @Body() createUserProfileDto: CreateUserProfileDto,
    ) {
        return await this.userService.createUserProfile(id, createUserProfileDto);
    }

    @Post(':id/posts')
    async createUserPost(
        @Param('id', ParseIntPipe) id: number,
        @Body() createUserPostDto: CreateUserPostDto,
    ) { 
        return await this.userService.createUserPost(id, createUserPostDto);
    }
}
