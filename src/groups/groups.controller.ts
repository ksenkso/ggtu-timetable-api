import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { GroupsService } from './groups.service';
import { Group } from '../models/group.model';

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
    addGroup(@Body('name') name: string) {
        return this.groupsService.create({name});
    }

    @Patch(':id')
    updateGroup(
        @Param('id') id: number,
        @Body('name') name: string
    ) {
        return this.groupsService.update(id, {name});
    }

    @Delete(':id')
    deleteGroup(@Param('id') id: number) {
        return this.groupsService.delete(id);
    }
}
