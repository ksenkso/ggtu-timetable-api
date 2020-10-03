import { Module } from '@nestjs/common';
import { TimetablesService } from './timetable.service';
import { TimetableController } from './timetable.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Teacher } from '../models/teacher.model';
import { Subject } from '../models/subject.model';
import { Cabinet } from '../models/cabinet.model';
import { Building } from '../models/building.model';
import { TeacherTimetable } from '../models/teacher-timetable.model';
import { Lesson } from '../models/lesson.model';
import { Group } from '../models/group.model';
import { Faculty } from '../models/faculty.model';
import { Specialization } from '../models/specialization.model';
import { RegularTimetable } from '../models/regular-timetable';

@Module({
  imports: [SequelizeModule.forFeature([Lesson, Teacher, Subject, Cabinet, Building, TeacherTimetable, Group, Faculty, Specialization, RegularTimetable])],
  providers: [TimetablesService],
  controllers: [TimetableController]
})
export class TimetableModule {}
