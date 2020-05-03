import { Controller, Get, UseGuards, Post, Req } from '@nestjs/common';
import { AppService } from './app.service';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth/auth.service';
import { Request } from 'express';

@Controller()
export class AppController {
  constructor(
      private readonly appService: AppService,
      private readonly authService: AuthService,
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post('auth')
  async signUp(@Req() req: Request) {
    const user = await this.authService.signUp(req);
    return user.withoutPassword();
  }

  @UseGuards(AuthGuard('local'))
  @Post('auth/login')
  async login(@Req() req) {
    return this.authService.login(req.user);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('profile')
  getProfile(@Req() req) {
    return req.user;
  }

}
