import { Module } from '@nestjs/common';
import { SubjectsService } from './subjects.service';
import { SubjectsController } from './subjects.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Subject } from '../models/subject.model';
import { Teacher } from '../models/teacher.model';
import { Cabinet } from '../models/cabinet.model';

@Module({
  imports: [SequelizeModule.forFeature([Subject, Teacher, Cabinet])],
  providers: [SubjectsService],
  controllers: [SubjectsController]
})
export class SubjectsModule {}
