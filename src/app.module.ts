import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from './auth/roles.guard';
import { TeachersModule } from './teachers/teachers.module';
import { LessonsModule } from './lessons/lessons.module';
import { GroupsModule } from './groups/groups.module';
import { CabinetsModule } from './cabinets/cabinets.module';
import { BuildingsModule } from './buildings/buildings.module';
import { TimetableModule } from './timetable/timetable.module';
import { PatchesModule } from './patches/patches.module';

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
              autoLoadModels: true,
              synchronize: true
          })
      }),
      UsersModule,
      TeachersModule,
      LessonsModule,
      GroupsModule,
      CabinetsModule,
      BuildingsModule,
      TimetableModule,
      PatchesModule
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
