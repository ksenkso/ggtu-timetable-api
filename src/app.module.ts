import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { TeachersModule } from './teachers/teachers.module';
import { SubjectsModule } from './subjects/subjects.module';
import { GroupsModule } from './groups/groups.module';
import { CabinetsModule } from './cabinets/cabinets.module';
import { BuildingsModule } from './buildings/buildings.module';
import { TimetableModule } from './timetable/timetable.module';
import { PatchesModule } from './patches/patches.module';
import { FacultiesModule } from './faculties/faculties.module';
import { SpecializationsModule } from './specializations/specializations.module';

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
      SubjectsModule,
      GroupsModule,
      CabinetsModule,
      BuildingsModule,
      TimetableModule,
      PatchesModule,
      FacultiesModule,
      SpecializationsModule,
  ],
  controllers: [AppController],
  providers: [
      AppService,
  ],
})
export class AppModule {}
