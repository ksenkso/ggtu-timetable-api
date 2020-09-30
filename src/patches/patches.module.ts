import { Module } from '@nestjs/common';
import { PatchesController } from './patches.controller';
import { PatchesService } from './patches.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { TimetablePatch } from '../models/patch.model';
import { Lesson } from '../models/lesson.model';
import { Group } from '../models/group.model';
import { Teacher } from '../models/teacher.model';
import { Cabinet } from '../models/cabinet.model';
import { TeacherPatch } from '../models/teacher-patch.model';
import { PatchDate } from '../models/patch-date';

@Module({
  imports: [SequelizeModule.forFeature([TimetablePatch, Lesson, Group, Teacher, Cabinet, TeacherPatch, PatchDate])],
  controllers: [PatchesController],
  providers: [PatchesService],
})
export class PatchesModule {
}
