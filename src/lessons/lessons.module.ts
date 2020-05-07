import { Module } from '@nestjs/common';
import { LessonsService } from './lessons.service';
import { LessonsController } from './lessons.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Lesson } from '../models/lesson.model';
import { Teacher } from '../models/teacher.model';
import { Cabinet } from '../models/cabinet.model';

@Module({
  imports: [SequelizeModule.forFeature([Lesson, Teacher, Cabinet])],
  providers: [LessonsService],
  controllers: [LessonsController]
})
export class LessonsModule {}
