import { Controller, Get, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { Roles } from '../auth/roles.decorator';
import { JwtGuard } from '../auth/jwt.guard';
import { RolesGuard } from '../auth/roles.guard';

@Controller('users')
export class UsersController {
    constructor(private usersService: UsersService) {}

    @Roles('admin')
    @UseGuards(JwtGuard, RolesGuard)
    @Get()
    index() {
        return this.usersService.findAll();
    }
}
