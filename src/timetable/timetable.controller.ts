import { Body, Controller, Delete, Get, Param, Patch, Post, Req, UseGuards } from '@nestjs/common';
import { TimetablesService } from './timetable.service';
import { Lesson } from '../models/lesson.model';
import { Request } from 'express';
import { User } from '../models/user.model';
import { UpdateLessonDto } from './dto/update-lesson.dto';
import { CreateLessonDto } from './dto/create-lesson.dto';
import { JwtGuard } from '../auth/jwt.guard';

@Controller('api/timetable')
export class TimetableController {

  constructor(private timetableService: TimetablesService) {
  }

  @Get()
  getAll(): Promise<Lesson[]> {
    return this.timetableService.findAll();
  }

  @Get(':id')
  getLesson(
    @Param('id') teacherId: number,
  ): Promise<Lesson> {
    return this.timetableService.findOne(teacherId);
  }

  @UseGuards(JwtGuard)
  @Post()
  addLesson(
    @Req() request: Request,
    @Body() lessonDto: CreateLessonDto,
  ) {
    return this.timetableService.create(request.user as User, lessonDto);
  }

  @UseGuards(JwtGuard)
  @Patch(':id')
  updateLesson(
    @Req() request: Request,
    @Param('id') id: number,
    @Body() lessonDto: UpdateLessonDto,
  ) {
    return this.timetableService.update(request.user as User, id, lessonDto);
  }

  @UseGuards(JwtGuard)
  @Delete(':id')
  deleteTimetableEntry(
    @Req() request: Request,
    @Param('id') id: number,
  ) {
    return this.timetableService.delete(request.user as User, id);
  }

  @Get('group/:groupId')
  async getGroupTimetable(
    @Param('groupId') groupId: number,
  ) {
    return this.timetableService.forLessonPropId({ key: 'groupId', id: groupId });
  }

  @Get('group/:groupId/:week')
  async getGroupTimetableByWeek(
    @Param('groupId') groupId: number,
    @Param('week') week: number,
  ) {
    return this.timetableService.forLessonPropId({ key: 'groupId', id: groupId, week: week });
  }

  @Get('subject/:lessonId')
  async getLessonTimetable(
    @Param('lessonId') lessonId: number,
  ) {
    return this.timetableService.forLessonPropId({ key: 'lessonId', id: lessonId });
  }

  @Get('subject/:lessonId/:week')
  async getLessonTimetableByWeek(
    @Param('lessonId') lessonId: number,
    @Param('week') week: number,
  ) {
    return this.timetableService.forLessonPropId({ key: 'lessonId', id: lessonId, week: week });
  }

  @Get('cabinet/:cabinetId')
  async getCabinetTimetable(
    @Param('cabinetId') cabinetId: number,
  ) {
    return this.timetableService.forLessonPropId({ key: 'cabinetId', id: cabinetId });
  }

  @Get('cabinet/:cabinetId/:week')
  async getCabinetTimetableByWeek(
    @Param('cabinetId') cabinetId: number,
    @Param('week') week: number,
  ) {
    return this.timetableService.forLessonPropId({ key: 'cabinetId', id: cabinetId, week: week });
  }

  @Get('teacher/:teacherId')
  async getTimetableForTeacher(
    @Param('teacherId') teacherId: number,
  ) {
    return this.timetableService.forTeacher(teacherId);
  }

  @Get('teacher/:teacherId/:week')
  async getTimetableForTeacherByWeek(
    @Param('teacherId') teacherId: number,
    @Param('week') week: number,
  ) {
    return this.timetableService.forTeacher(teacherId, true, week);
  }
}
