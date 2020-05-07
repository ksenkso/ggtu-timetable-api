import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { TimetablesService } from './timetable.service';
import { Day, TimetableEntry, TimetableEntryType } from '../models/timetable-entry.model';

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
        @Body('teacherIds') teacherIds: number[],
        @Body('day') day: Day,
        @Body('index') index: number,
        @Body('type') type: TimetableEntryType,
    ) {
        return this.timetableService.create({
            lessonId,
            cabinetId,
            teacherIds,
            day,
            index,
            type,
        });
    }

    @Patch(':id')
    updateTimetableEntry(
        @Param('id') id: number,
        @Body('lessonId') lessonId: number,
        @Body('cabinetId') cabinetId: number,
        @Body('teacherIds') teacherIds: number[],
        @Body('day') day: Day,
        @Body('index') index: number,
        @Body('type') type: TimetableEntryType,
    ) {
        return this.timetableService.update(id, {
            lessonId,
            cabinetId,
            teacherIds,
            day,
            index,
            type,
        });
    }

    @Delete(':id')
    deleteTimetableEntry(@Param('id') id: number) {
        return this.timetableService.delete(id);
    }
}
