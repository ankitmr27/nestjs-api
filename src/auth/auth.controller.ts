import { Body, Controller, Get, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserModelDto } from 'src/user-model/dto/create-user-model.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Get()
  async authHome() {
    return { message: 'This is auth route' };
  }

  @Post('signup')
  async signup(@Body() dto: CreateUserModelDto) {
    return this.authService.signup(dto);
  }

  @Post('signin')
  async signin(@Body() dto: CreateUserModelDto) {
    return this.authService.signin(dto);
  }
}
