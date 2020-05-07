import { Module } from '@nestjs/common';
import { TeachersController } from './teachers.controller';
import { TeachersService } from './teachers.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Teacher } from '../models/teacher.model';
import { TimetableEntry } from '../models/timetable-entry.model';
import { TeacherTimetable } from '../models/teacher-timetable.model';

@Module({
  imports: [SequelizeModule.forFeature([Teacher, TimetableEntry, TeacherTimetable])],
  controllers: [TeachersController],
  providers: [TeachersService]
})
export class TeachersModule {}
