import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { GroupsService } from './groups.service';
import { Group } from '../models/group.model';
import { CreateGroupDto } from './dto/create-group.dto';
import { UpdateGroupDto } from './dto/update-group.dto';

@Controller('api/groups')
export class GroupsController {
    constructor(private groupsService: GroupsService) {}

    @Get()
    getAll(): Promise<Group[]> {
        return this.groupsService.findAll();
    }

    @Get(':id')
    getGroup(@Param('id') teacherId: number): Promise<Group> {
        return this.groupsService.findOne(teacherId);
    }

    @Post()
    addGroup(@Body() groupDto: CreateGroupDto) {
        return this.groupsService.create(groupDto);
    }

    @Patch(':id')
    updateGroup(
        @Param('id') id: number,
        @Body() groupDto: UpdateGroupDto
    ) {
        return this.groupsService.update(id, groupDto);
    }

    @Delete(':id')
    deleteGroup(@Param('id') id: number) {
        return this.groupsService.delete(id);
    }
}
