import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { User } from '../models/user.model';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {
  }

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
    const payload = { username: user.username, id: user.id };
    return this.createPayload(payload);
  }

  async refresh(accessToken: string, refreshToken?: string) {
    const accessPayload = this.jwtService.verify(accessToken) as any;
    const refreshPayload = this.jwtService.verify(refreshToken) as any;
    if (accessPayload.sub !== refreshPayload.sub) {
      throw new UnauthorizedException({
        name: 'InvalidSubjectError',
        message: 'ids for refresh token and access token should be equal',
      });
    }
    const { username, sub } = accessPayload;

    return this.createPayload({ username, id: sub });
  }

  private async createPayload({ id, username }) {
    return {
      accessToken: this.jwtService.sign({ username, sub: id }),
      refreshToken: this.jwtService.sign({ sub: id }, { expiresIn: '30 days' }),
    };
  }
}
