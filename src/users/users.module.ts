import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from '../models/user.model';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { Role } from '../models/role.model';
import { UserRole } from '../models/user-role.model';

@Module({
    imports: [
        SequelizeModule.forFeature([User, Role, UserRole])
    ],
    providers: [UsersService],
    exports: [UsersService],
    controllers: [UsersController]
})
export class UsersModule {}
