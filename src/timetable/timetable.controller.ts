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

  @Get('group/:groupId')
  async getGroupTimetable(
    @Param('groupId') groupId: number,
  ) {
    return this.timetableService.forEntryPropId('groupId', groupId);
  }

  @Get('group/:groupId/:week')
  async getGroupTimetableByWeek(
    @Param('groupId') groupId: number,
    @Param('week') week: Week,
  ) {
    return this.timetableService.forEntryPropId('groupId', groupId, week);
  }

  @Get('lesson/:lessonId')
  async getLessonTimetable(
    @Param('lessonId') lessonId: number,
  ) {
    return this.timetableService.forEntryPropId('lessonId', lessonId);
  }

  @Get('lesson/:lessonId/:week')
  async getLessonTimetableByWeek(
    @Param('lessonId') lessonId: number,
    @Param('week') week: Week,
  ) {
    return this.timetableService.forEntryPropId('lessonId', lessonId, week);
  }

  @Get('cabinet/:cabinetId')
  async getCabinetTimetable(
    @Param('cabinetId') cabinetId: number,
  ) {
    return this.timetableService.forEntryPropId('cabinetId', cabinetId);
  }

  @Get('cabinet/:cabinetId/:week')
  async getCabinetTimetableByWeek(
    @Param('cabinetId') cabinetId: number,
    @Param('week') week: Week,
  ) {
    return this.timetableService.forEntryPropId('cabinetId', cabinetId, week);
  }

  @Get('teacher/:teacherId')
  async forTeacher(
    @Param('teacherId') teacherId: number,
  ) {
    return this.timetableService.forTeacher(teacherId);
  }

  @Get('teacher/:teacherId/:week')
  async forTeacherByWeek(
    @Param('teacherId') teacherId: number,
    @Param('week') week: Week,
  ) {
    return this.timetableService.forTeacher(teacherId, week);
  }
}
