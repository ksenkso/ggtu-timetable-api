import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { User } from './models/user.model';
import { UsersModule } from './users/users.module';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from './auth/roles.guard';
import { Role } from './models/role.model';
import { UserRole } from './models/user-role.model';
import { TeachersModule } from './teachers/teachers.module';

@Module({
  imports: [
      AuthModule,
      ConfigModule.forRoot(),
      SequelizeModule.forRootAsync({
          imports: [ConfigModule],
          inject: [ConfigService],
          useFactory: (configService: ConfigService) => ({
              dialect: 'mysql',
              host: configService.get<string>('DB_HOST'),
              port: configService.get<number>('DB_PORT'),
              username: configService.get<string>('DB_USER'),
              password: configService.get<string>('DB_PASSWORD'),
              database: configService.get<string>('DB_DATABASE'),
              models: [User, Role, UserRole],
              synchronize: true
          })
      }),
      UsersModule,
      TeachersModule
  ],
  controllers: [AppController],
  providers: [
      AppService,
      {
          provide: APP_GUARD,
          useClass: RolesGuard,
      }
  ],
})
export class AppModule {}
