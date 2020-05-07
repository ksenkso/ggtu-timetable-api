import { Module } from '@nestjs/common';
import { CabinetsService } from './cabinets.service';
import { CabinetsController } from './cabinets.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Cabinet } from '../models/cabinet.model';
import { Building } from '../models/building.model';

@Module({
  imports: [SequelizeModule.forFeature([Cabinet, Building])],
  providers: [CabinetsService],
  controllers: [CabinetsController]
})
export class CabinetsModule {}
