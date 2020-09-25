import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { PatchesService } from './patches.service';
import { TimetableEntryType, Week } from '../models/timetable-entry.model';
import { TimetablePatch } from '../models/patch.model';

@Controller('api/patches')
export class PatchesController {

  constructor(private patchesService: PatchesService) {
  }

  @Get()
  getAll(): Promise<TimetablePatch[]> {
    return this.patchesService.findAll();
  }

  @Get(':id')
  getTimetableEntry(@Param('id') teacherId: number): Promise<TimetablePatch> {
    return this.patchesService.findOne(teacherId);
  }

  @Post()
  addTimetableEntry(
    @Body('lessonId') lessonId: number,
    @Body('cabinetId') cabinetId: number,
    @Body('groupId') groupId: number,
    @Body('teacherIds') teacherIds: number[],
    @Body('date') date: Date,
    @Body('week') week: Week,
    @Body('index') index: number,
    @Body('type') type: TimetableEntryType,
  ) {
    return this.patchesService.create({
      lessonId,
      cabinetId,
      teacherIds,
      groupId,
      date,
      week,
      index,
      type,
    });
  }

  @Patch(':id')
  updateTimetablePatch(
    @Param('id') id: number,
    @Body('lessonId') lessonId: number,
    @Body('cabinetId') cabinetId: number,
    @Body('groupId') groupId: number,
    @Body('teacherIds') teacherIds: number[],
    @Body('date') date: Date,
    @Body('week') week: Week,
    @Body('index') index: number,
    @Body('type') type: TimetableEntryType,
  ) {
    return this.patchesService.update(id, {
      lessonId,
      cabinetId,
      teacherIds,
      groupId,
      date,
      week,
      index,
      type,
    });
  }

  @Delete(':id')
  deleteTimetablePatch(@Param('id') id: number) {
    return this.patchesService.delete(id);
  }

  @Get('group/:groupId')
  async getGroupTimetablePatches(
    @Param('groupId') groupId: number,
  ) {
    return this.patchesService.forEntryPropId('groupId', groupId);
  }

  @Get('group/:groupId/:week')
  async getGroupPatchesByWeek(
    @Param('groupId') groupId: string,
    @Param('week') week: string,
  ) {
    return this.patchesService.forEntryPropId('groupId', +groupId, +week);
  }

  @Get('lesson/:lessonId')
  async getLessonPatches(
    @Param('lessonId') lessonId: number,
  ) {
    return this.patchesService.forEntryPropId('lessonId', lessonId);
  }

  @Get('lesson/:lessonId/:week')
  async getLessonPatchesByWeek(
    @Param('lessonId') lessonId: number,
    @Param('week') week: Week,
  ) {
    return this.patchesService.forEntryPropId('lessonId', lessonId, week);
  }

  @Get('cabinet/:cabinetId')
  async getCabinetPatches(
    @Param('cabinetId') cabinetId: number,
  ) {
    return this.patchesService.forEntryPropId('cabinetId', cabinetId);
  }

  @Get('cabinet/:cabinetId/:week')
  async getCabinetPatchesByWeek(
    @Param('cabinetId') cabinetId: number,
    @Param('week') week: Week,
  ) {
    return this.patchesService.forEntryPropId('cabinetId', cabinetId, week);
  }

  @Get('teacher/:teacherId')
  async getPatchesForTeacher(
    @Param('teacherId') teacherId: number,
  ) {
    return this.patchesService.forTeacher(teacherId);
  }

  @Get('teacher/:teacherId/:week')
  async getPatchesForTeacherByWeek(
    @Param('teacherId') teacherId: number,
    @Param('week') week: Week,
  ) {
    return this.patchesService.forTeacher(teacherId, week);
  }
}
