import { Body, Controller, Delete, Get, Param, Patch, Post, Query, ParseIntPipe, ValidationPipe} from '@nestjs/common';
import { UsersService } from './users.service';

import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto';


@Controller('users')
export class UsersController {

    constructor(private readonly UsersService: UsersService){}

    @Get('')
    getAllUsers() {
        return this.UsersService.getAllUsers();
    }

    @Get('/plain')
    getUsers() {
        return this.UsersService.getUsers();
    }

    @Get(':id')
    getUserById(@Param('id', ParseIntPipe) id: number) {
        return this.UsersService.getUserById(id);
    }

    @Post('')
    createUser(@Body(ValidationPipe) createUserDto: CreateUserDto) {
        const joinDate = new Date();
        const formattedJoinDate = `${joinDate.getFullYear()}-${(joinDate.getMonth() + 1).toString().padStart(2, '0')}-${joinDate.getDate().toString().padStart(2, '0')}`;
        const dateOfBirth = new Date();
        const formattedDateOfBirth = `${dateOfBirth.getFullYear()}-${(dateOfBirth.getMonth() + 1).toString().padStart(2, '0')}-${dateOfBirth.getDate().toString().padStart(2, '0')}`;
        const desc  = '';

        const newUser = {
            ...createUserDto,
            dateOfBirth: formattedDateOfBirth,
            joinDate: formattedJoinDate,
            desc: desc,
            role: 3,
        }
        return this.UsersService.createUser(newUser);
    }

    @Patch(':id')
    updateUser(@Param('id', ParseIntPipe) id: number, @Body(ValidationPipe) UpdateUserDto: UpdateUserDto) {
        return this.UsersService.updateUser(id, UpdateUserDto);
    }

    @Delete(':id')
    deleteUser(@Param('id', ParseIntPipe) id: number) {
        return this.UsersService.delete(id);
    }
}
