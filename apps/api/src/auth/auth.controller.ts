import { Controller, Post, Body, Res } from '@nestjs/common';
import { Response } from 'express';

import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginDto } from './dto/login.dto';
import { Public } from './decorators/public.decorator';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @Public()
  register(@Body() dto: CreateUserDto) {
    return this.authService.register(dto);
  }

  @Post('login')
  @Public()
  async login(
    @Body() dto: LoginDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const result = await this.authService.login(dto);

    res.cookie('access_token', result.access_token, {
      httpOnly: true,
      secure: false, // to be changed to true in production (HTTPS)
      sameSite: 'lax',
      path: '/',
      maxAge: 1000 * 60 * 60 * 24, // 1 day
    });

    return {
      message: 'Login successful',
      data: {
        user: result.user,
      },
    };
  }

  @Post('logout')
  logout(@Res({ passthrough: true }) res: Response) {
    res.clearCookie('accessToken');
    return {
      message: 'Logged out successfully',
    };
  }
}
