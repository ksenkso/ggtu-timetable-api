import { Module } from '@nestjs/common';
import { SpecializationsService } from './specializations.service';
import { SpecializationsController } from './specializations.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Specialization } from '../models/specialization.model';

@Module({
  imports: [SequelizeModule.forFeature([Specialization])],
  providers: [SpecializationsService],
  controllers: [SpecializationsController]
})
export class SpecializationsModule {}
