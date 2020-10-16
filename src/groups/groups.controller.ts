import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { GroupsService } from './groups.service';
import { Group } from '../models/group.model';
import { CreateGroupDto } from './dto/create-group.dto';
import { UpdateGroupDto } from './dto/update-group.dto';
import { Roles } from '../auth/roles.decorator';
import { JwtGuard } from '../auth/jwt.guard';
import { RolesGuard } from '../auth/roles.guard';

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

    @Roles('admin')
    @UseGuards(JwtGuard, RolesGuard)
    @Post()
    addGroup(@Body() groupDto: CreateGroupDto) {
        return this.groupsService.create(groupDto);
    }

    @Roles('admin')
    @UseGuards(JwtGuard, RolesGuard)
    @Patch(':id')
    updateGroup(
        @Param('id') id: number,
        @Body() groupDto: UpdateGroupDto
    ) {
        return this.groupsService.update(id, groupDto);
    }

    @Roles('admin')
    @UseGuards(JwtGuard, RolesGuard)
    @Delete(':id')
    deleteGroup(@Param('id') id: number) {
        return this.groupsService.delete(id);
    }
}
