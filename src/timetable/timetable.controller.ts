import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { TimetablesService } from './timetable.service';
import { Day, TimetableEntry, TimetableEntryType, Week } from '../models/timetable-entry.model';

@Controller('api/timetable')
export class TimetableController {

    constructor(private timetableService: TimetablesService) {
    }

    @Get()
    getAll(): Promise<TimetableEntry[]> {
        return this.timetableService.findAll();
    }

    @Get(':id')
    getTimetableEntry(@Param('id') teacherId: number): Promise<TimetableEntry> {
        return this.timetableService.findOne(teacherId);
    }

    @Post()
    addTimetableEntry(
        @Body('lessonId') lessonId: number,
        @Body('cabinetId') cabinetId: number,
        @Body('groupId') groupId: number,
        @Body('teacherIds') teacherIds: number[],
        @Body('day') day: Day,
        @Body('week') week: Week,
        @Body('index') index: number,
        @Body('type') type: TimetableEntryType,
    ) {
        return this.timetableService.create({
            lessonId,
            cabinetId,
            teacherIds,
            groupId,
            day,
            week,
            index,
            type,
        });
    }

    @Patch(':id')
    updateTimetableEntry(
        @Param('id') id: number,
        @Body('lessonId') lessonId: number,
        @Body('cabinetId') cabinetId: number,
        @Body('groupId') groupId: number,
        @Body('teacherIds') teacherIds: number[],
        @Body('day') day: Day,
        @Body('week') week: Week,
        @Body('index') index: number,
        @Body('type') type: TimetableEntryType,
    ) {
        return this.timetableService.update(id, {
            lessonId,
            cabinetId,
            teacherIds,
            groupId,
            day,
            week,
            index,
            type,
        });
    }

    @Delete(':id')
    deleteTimetableEntry(@Param('id') id: number) {
        return this.timetableService.delete(id);
    }

    @Get('group/:groupId/')
    async getGroupTimetable(
      @Param('groupId') groupId: number
    ) {
        return this.timetableService.forGroup(groupId);
    }
}
