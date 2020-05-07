import { Module } from '@nestjs/common';
import { BuildingsService } from './buildings.service';
import { BuildingsController } from './buildings.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Building } from '../models/building.model';

@Module({
  imports: [SequelizeModule.forFeature([Building])],
  providers: [BuildingsService],
  controllers: [BuildingsController]
})
export class BuildingsModule {}
