import { Controller, Get, Post, Query, Req, UseGuards } from '@nestjs/common';
import { Request } from 'express';
import { AuthService } from './auth.service';
import { JwtGuard } from './jwt.guard';
import { LocalGuard } from './local.guard';

@Controller('api/auth')
export class AuthController {

    constructor(
        private readonly authService: AuthService,
    ) {}

    @Post()
    async signUp(@Req() req: Request) {
        const user = await this.authService.signUp(req);
        return user.withoutPassword();
    }

    @UseGuards(LocalGuard)
    @Post('login')
    async login(@Req() req) {
        return this.authService.login(req.user);
    }

    @UseGuards(JwtGuard)
    @Get('profile')
    getProfile(@Req() req) {
        return req.user;
    }

    @Get('refresh')
    async refresh(
        @Req() req: Request,
        @Query('refreshToken') refreshToken: string
    ) {
        // console.log(refreshToken);
        return this.authService.refresh(
          req.header('Authorization').slice('Bearer '.length),
          refreshToken
      )
    }


    /*@UseGuards(JwtGuard)
    @Roles('admin')
    @Delete()
    async deleteUser(
        @Param('username') username: string,
        @Req() req: Request,
    ) {
        return this.usersService.delete(username);
    }*/
}
