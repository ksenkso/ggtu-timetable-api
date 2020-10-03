import { Module } from '@nestjs/common';
import { TeachersController } from './teachers.controller';
import { TeachersService } from './teachers.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Teacher } from '../models/teacher.model';
import { TeacherTimetable } from '../models/teacher-timetable.model';
import { Lesson } from '../models/lesson.model';

@Module({
  imports: [SequelizeModule.forFeature([Teacher, Lesson, TeacherTimetable])],
  controllers: [TeachersController],
  providers: [TeachersService]
})
export class TeachersModule {}
