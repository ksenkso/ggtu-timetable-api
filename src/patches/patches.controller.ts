import { Body, Controller, Delete, Get, Param, Patch, Post, Query, Req, UseGuards } from '@nestjs/common';
import { Lesson } from '../models/lesson.model';
import { TimetablesService } from '../timetable/timetable.service';
import { Request } from 'express';
import { User } from '../models/user.model';
import { CreatePatchDto } from './dto/create-patch.dto';
import { JwtGuard } from '../auth/jwt.guard';
import { UpdatePatchDto } from './dto/update-patch.dto';
import { Roles } from '../auth/roles.decorator';
import { RolesGuard } from '../auth/roles.guard';

@Controller('api/patches')
export class PatchesController {

  constructor(private timetablesService: TimetablesService) {
  }

  @Get()
  getAll(
    @Query('from') from: string,
    @Query('to') to: string
  ): Promise<Lesson[]> {
    const options = {isRegular: false};
    if (from && to) {
      options['range'] = [from, to]
    }
    return this.timetablesService.findAll(options);
  }

  @Get(':id')
  getPatch(@Param('id') id: number): Promise<Lesson> {
    return this.timetablesService.findOne(id);
  }

  @Roles('admin')
  @UseGuards(JwtGuard, RolesGuard)
  @Post()
  addPatch(
    @Req() request: Request,
    @Body() patchDto: CreatePatchDto,
  ) {
    patchDto.isRegular = false;
    return this.timetablesService.create(request.user as User, patchDto);
  }

  @Roles('admin')
  @UseGuards(JwtGuard, RolesGuard)
  @Patch(':id')
  updatePatch(
    @Req() request: Request,
    @Param('id') id: number,
    @Body() patchDto: UpdatePatchDto,
  ) {
    return this.timetablesService.update(request.user as User, id, patchDto);
  }

  @Roles('admin')
  @UseGuards(JwtGuard, RolesGuard)
  @Delete(':id')
  deletePatch(
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

  @Get('subject/:subjectId')
  async getLessonPatches(
    @Param('subjectId') subjectId: number,
  ) {
    return this.timetablesService.forLessonPropId({ key: 'subjectId', id: subjectId, isRegular: false });
  }

  @Get('cabinet/:cabinetId')
  async getCabinetPatches(
    @Param('cabinetId') cabinetId: number,
  ) {
    return this.timetablesService.forLessonPropId({ key: 'cabinetId', id: cabinetId, isRegular: false });
  }

  @Get('teacher/:teacherId')
  async getPatchesForTeacher(
    @Param('teacherId') teacherId: number,
  ) {
    return this.timetablesService.forTeacher(teacherId, false);
  }

}
