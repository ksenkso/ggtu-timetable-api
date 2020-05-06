import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { User } from '../models/user.model';

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService
    ) {}

    async signUp(req: Request): Promise<User> {
        return this.usersService.create(req.body.username, req.body.password);
    }

    async validateUser(username: string, pass: string): Promise<any> {
        const user = await this.usersService.findOne(username);
        if (user && await user.comparePassword(pass)) {
            return user.withoutPassword();
        }
        return null;
    }

    async login(user: any) {
        const payload = { username: user.username, sub: user.userId };
        return {
            token: this.jwtService.sign(payload),
        };
    }
}
