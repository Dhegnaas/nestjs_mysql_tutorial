import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { CreateUserDto } from 'src/users/dtos/CreateUser.dto';
import { UsersService } from '../../services/users/users.service';
import { UpdateUserDto } from '../../dtos/UpdateUser.dto';

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
        // Waxay u gudbinaysaa xogta Service-ka
        return this.UserService.createUser(CreateUserDto); 
    } 

    @Put(':id')
     async updateUserById(
        @Param('id', ParseIntPipe) id: number,
        @Body() UpdateUserDto: UpdateUserDto,
    ) {
      await  this.UserService.UpdateUser(id, UpdateUserDto);
    }

    @Delete(':id')
     async deleteUserById(@Param('id', ParseIntPipe) id: number ) {
      await  this.UserService.deleteUser(id);
    }

}
