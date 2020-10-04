import { Body, Controller, Delete, Get, Param, Patch, Post, Req, UseGuards } from '@nestjs/common';
import { Lesson } from '../models/lesson.model';
import { Week } from '../models/regular-timetable';
import { TimetablesService } from '../timetable/timetable.service';
import { Request } from 'express';
import { User } from '../models/user.model';
import { CreatePatchDto } from './dto/create-patch.dto';
import { JwtGuard } from '../auth/jwt.guard';
import { UpdatePatchDto } from './dto/update-patch.dto';

@Controller('api/patches')
export class PatchesController {

  constructor(private timetablesService: TimetablesService) {
  }

  @Get()
  getAll(): Promise<Lesson[]> {
    return this.timetablesService.findAll({ isRegular: false });
  }

  @Get(':id')
  getTimetableEntry(@Param('id') id: number): Promise<Lesson> {
    return this.timetablesService.findOne(id);
  }

  @UseGuards(JwtGuard)
  @Post()
  addTimetableEntry(
    @Req() request: Request,
    @Body() patchDto: CreatePatchDto,
  ) {
    patchDto.isRegular = false;
    return this.timetablesService.create(request.user as User, patchDto);
  }

  @Patch(':id')
  updatePatch(
    @Req() request: Request,
    @Param('id') id: number,
    @Body() patchDto: UpdatePatchDto,
  ) {
    return this.timetablesService.update(request.user as User, id, patchDto);
  }
  @UseGuards(JwtGuard)
  @Delete(':id')
  deleteLesson(
    @Req() request: Request,
    @Param('id') id: number,
  ) {
    return this.timetablesService.delete(request.user as User, id);
  }

  @Get('group/:groupId')
  async getGroupPatches(
    @Param('groupId') groupId: number,
  ) {
    return this.timetablesService.forLessonPropId({ key: 'groupId', id: groupId, isRegular: false });
  }

  @Get('group/:groupId/:week')
  async getGroupPatchesByWeek(
    @Param('groupId') groupId: string,
    @Param('week') week: string,
  ) {
    return this.timetablesService.forLessonPropId({ key: 'groupId', id: +groupId, week: +week, isRegular: false });
  }

  @Get('subject/:lessonId')
  async getLessonPatches(
    @Param('lessonId') lessonId: number,
  ) {
    return this.timetablesService.forLessonPropId({ key: 'lessonId', id: lessonId, isRegular: false });
  }

  @Get('subject/:lessonId/:week')
  async getLessonPatchesByWeek(
    @Param('lessonId') lessonId: number,
    @Param('week') week: Week,
  ) {
    return this.timetablesService.forLessonPropId({ key: 'lessonId', id: lessonId, week: week, isRegular: false });
  }

  @Get('cabinet/:cabinetId')
  async getCabinetPatches(
    @Param('cabinetId') cabinetId: number,
  ) {
    return this.timetablesService.forLessonPropId({ key: 'cabinetId', id: cabinetId, isRegular: false });
  }

  @Get('cabinet/:cabinetId/:week')
  async getCabinetPatchesByWeek(
    @Param('cabinetId') cabinetId: number,
    @Param('week') week: Week,
  ) {
    return this.timetablesService.forLessonPropId({ key: 'cabinetId', id: cabinetId, week: week, isRegular: false });
  }

  @Get('teacher/:teacherId')
  async getPatchesForTeacher(
    @Param('teacherId') teacherId: number,
  ) {
    return this.timetablesService.forTeacher(teacherId, false);
  }

  @Get('teacher/:teacherId/:week')
  async getPatchesForTeacherByWeek(
    @Param('teacherId') teacherId: number,
    @Param('week') week: Week,
  ) {
    return this.timetablesService.forTeacher(teacherId, false, week);
  }
}
