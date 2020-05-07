import { Module } from '@nestjs/common';
import { TimetablesService } from './timetable.service';
import { TimetableController } from './timetable.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Teacher } from '../models/teacher.model';
import { Lesson } from '../models/lesson.model';
import { Cabinet } from '../models/cabinet.model';
import { Building } from '../models/building.model';
import { TimetableEntry } from '../models/timetable-entry.model';
import { TeacherTimetable } from '../models/teacher-timetable.model';

@Module({
  imports: [SequelizeModule.forFeature([TimetableEntry, Teacher, Lesson, Cabinet, Building, TeacherTimetable])],
  providers: [TimetablesService],
  controllers: [TimetableController]
})
export class TimetableModule {}
