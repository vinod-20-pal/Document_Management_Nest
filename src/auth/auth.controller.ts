import { Controller, Get, Post, Body, Patch, Param, Delete, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register-auth.dto';
import { LoginDto } from './dto/login-auth.dto';
import { JwtAuthGuard } from '../guard/jwt-guard/jwt-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(@Body() registerAuthDto: RegisterDto) {
    try {
      return this.authService.register(registerAuthDto);
    } catch (error) {
      throw error;
    }
  }

  @Post('login')
  login(@Body() loginAuthDto: LoginDto) {
    try {
      return this.authService.login(loginAuthDto);
    } catch (error) {
      throw error;
    }
  }

  @Post('logout')
  @UseGuards(JwtAuthGuard)
  async logout(@Req() req: any) {
    const token = req.headers['authorization']?.split(' ')[1];
    if (!token) {
      throw new Error('Authorization token not provided');
    }
    return this.authService.logout(token);
  }
}
