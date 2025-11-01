import { Controller, Post, Body, Get, Param, Res, Req } from '@nestjs/common';
import { AuthService } from './auth.service';

import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post('register')
  async register(@Body() createUserDto: CreateUserDto) {
    return this.authService.register(createUserDto);
  }

  @Get('verify/:token')
  async verifyEmail(@Param('token') token: string) {
    return this.authService.verifyEmail(token);
  }

  @Post('login')
  async login(
    @Body() updateUserDto: UpdateUserDto,
    @Res({ passthrough: true }) response: Response
  ) {
    return this.authService.login(updateUserDto, response);
  }

  @Get('check-login')
  async checkLogin(@Req() request: Request & { cookies: any }) {
    console.log(1);

    return this.authService.checkLogin(request);
  }
  @Post('logout')
  async logout(@Res() response: Response) {
    return this.authService.logout(response);
  }
}
