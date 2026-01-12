import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateUserDto } from 'src/users/dtos/CreateUser.dto';
import { UsersService } from '../../services/users/users.service';

@Controller('users')
export class UsersController {
    // Sidan ayuu noqonayaa constructor-ka saxda ah:
    constructor(private readonly UserService: UsersService) {}

    @Get () 
    getUsers() {
        // Halkan waxaad uga wici kartaa findUsers()
        return this.UserService.findUsers();
    }

    @Post()
    createUser(@Body() CreateUserDto: CreateUserDto) {
        console.log(CreateUserDto);
        // Waxay u gudbinaysaa xogta Service-ka
        return this.UserService.createUser(CreateUserDto);
    } 
}
