import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from '../models/user.model';

@Injectable()
export class UsersService {
    constructor(
        @InjectModel(User)
        private users: typeof User
    ) {}

    findAll(): Promise<User[]> {
        return this.users.findAll().all();
    }

    async findOne(username: string) {
        return this.users.findOne({where: {username}});
    }

    async create(username: string, password: string): Promise<User> {
        const user = new User({
            username,
            password
        });
        return user.save();
    }

    async delete(username: string): Promise<number> {
        return this.users.destroy({where: {username}});
    }
}
