import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { PatchesService } from './patches.service';
import { Week } from '../models/timetable-entry.model';
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
    @Body('lessonId') lessonId: string,
    @Body('cabinetId') cabinetId: string,
    @Body('groupId') groupId: string,
    @Body('teacherIds') teacherIds: string[],
    @Body('dates') dates: string[],
    @Body('index') index: string,
    @Body('type') type: string,
  ) {
    return this.patchesService.create({
      lessonId: +lessonId,
      cabinetId: +cabinetId,
      teacherIds: teacherIds.map(Number),
      groupId: +groupId,
      dates,
      index: +index,
      type: +type,
    });
  }

  @Patch(':id')
  updateTimetablePatch(
    @Param('id') id: string,
    @Body('lessonId') lessonId?: string,
    @Body('cabinetId') cabinetId?: string,
    @Body('groupId') groupId?: string,
    @Body('teacherIds') teacherIds: string[] = [],
    @Body('dates') dates?: string[],
    @Body('index') index?: string,
    @Body('type') type?: string,
  ) {
    return this.patchesService.update(+id, {
      lessonId: lessonId && +lessonId,
      cabinetId: cabinetId && +cabinetId,
      teacherIds: teacherIds && teacherIds.map(Number),
      groupId: groupId && +groupId,
      dates,
      index: index && +index,
      type: type && +type,
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
