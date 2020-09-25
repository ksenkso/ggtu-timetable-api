import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { TimetablesService } from './timetable.service';
import { TimetableEntry } from '../models/timetable-entry.model';

@Controller('api/timetable')
export class TimetableController {

  constructor(private timetableService: TimetablesService) {
  }

  @Get()
  getAll(): Promise<TimetableEntry[]> {
    return this.timetableService.findAll();
  }

  @Get(':id')
  getTimetableEntry(
    @Param('id') teacherId: string
  ): Promise<TimetableEntry> {
    return this.timetableService.findOne(+teacherId);
  }

  @Post()
  addTimetableEntry(
    @Body('lessonId') lessonId: string,
    @Body('cabinetId') cabinetId: string,
    @Body('groupId') groupId: string,
    @Body('teacherIds') teacherIds: string[],
    @Body('day') day: string,
    @Body('week') week: string,
    @Body('index') index: string,
    @Body('type') type: string,
  ) {
    return this.timetableService.create({
      lessonId: +lessonId,
      cabinetId: +cabinetId,
      teacherIds: teacherIds.map(Number),
      groupId: +groupId,
      day: +day,
      week: +week,
      index: +index,
      type: +type,
    });
  }

  @Patch(':id')
  updateTimetableEntry(
    @Param('id') id: string,
    @Body('lessonId') lessonId: string,
    @Body('cabinetId') cabinetId: string,
    @Body('groupId') groupId: string,
    @Body('teacherIds') teacherIds: string[],
    @Body('day') day: string,
    @Body('week') week: string,
    @Body('index') index: string,
    @Body('type') type: string,
  ) {
    return this.timetableService.update(+id, {
      lessonId: +lessonId,
      cabinetId: +cabinetId,
      teacherIds: teacherIds.map(Number),
      groupId: +groupId,
      day: +day,
      week: +week,
      index: +index,
      type: +type,
    });
  }

  @Delete(':id')
  deleteTimetableEntry(
    @Param('id') id: string
  ) {
    return this.timetableService.delete(+id);
  }

  @Get('group/:groupId')
  async getGroupTimetable(
    @Param('groupId') groupId: string,
  ) {
    return this.timetableService.forEntryPropId('groupId', +groupId);
  }

  @Get('group/:groupId/:week')
  async getGroupTimetableByWeek(
    @Param('groupId') groupId: string,
    @Param('week') week: string,
  ) {
    return this.timetableService.forEntryPropId('groupId', +groupId, +week);
  }

  @Get('lesson/:lessonId')
  async getLessonTimetable(
    @Param('lessonId') lessonId: string,
  ) {
    return this.timetableService.forEntryPropId('lessonId', +lessonId);
  }

  @Get('lesson/:lessonId/:week')
  async getLessonTimetableByWeek(
    @Param('lessonId') lessonId: string,
    @Param('week') week: string,
  ) {
    return this.timetableService.forEntryPropId('lessonId', +lessonId, +week);
  }

  @Get('cabinet/:cabinetId')
  async getCabinetTimetable(
    @Param('cabinetId') cabinetId: string,
  ) {
    return this.timetableService.forEntryPropId('cabinetId', +cabinetId);
  }

  @Get('cabinet/:cabinetId/:week')
  async getCabinetTimetableByWeek(
    @Param('cabinetId') cabinetId: string,
    @Param('week') week: string,
  ) {
    return this.timetableService.forEntryPropId('cabinetId', +cabinetId, +week);
  }

  @Get('teacher/:teacherId')
  async getTimetableForTeacher(
    @Param('teacherId') teacherId: string,
  ) {
    return this.timetableService.forTeacher(+teacherId);
  }

  @Get('teacher/:teacherId/:week')
  async getTimetableForTeacherByWeek(
    @Param('teacherId') teacherId: string,
    @Param('week') week: string,
  ) {
    return this.timetableService.forTeacher(+teacherId, +week);
  }
}
