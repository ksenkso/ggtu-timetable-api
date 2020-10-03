import { Module } from '@nestjs/common';
import { PatchesController } from './patches.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Subject } from '../models/subject.model';
import { Group } from '../models/group.model';
import { Teacher } from '../models/teacher.model';
import { Cabinet } from '../models/cabinet.model';
import { PatchTimetable } from '../models/patch-timetable';
import { TeacherTimetable } from '../models/teacher-timetable.model';
import { Lesson } from '../models/lesson.model';
import { TimetablesService } from '../timetable/timetable.service';

@Module({
  imports: [SequelizeModule.forFeature([Subject, Group, Teacher, Cabinet, PatchTimetable, TeacherTimetable, Lesson])],
  controllers: [PatchesController],
  providers: [TimetablesService],
})
export class PatchesModule {
}
