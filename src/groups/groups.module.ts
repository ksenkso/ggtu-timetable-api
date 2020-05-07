import { Module } from '@nestjs/common';
import { GroupsService } from './groups.service';
import { GroupsController } from './groups.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Group } from '../models/group.model';

@Module({
  imports: [SequelizeModule.forFeature([Group])],
  providers: [GroupsService],
  controllers: [GroupsController]
})
export class GroupsModule {}
