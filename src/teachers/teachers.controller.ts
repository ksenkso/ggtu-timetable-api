import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { TeachersService } from './teachers.service';
import { Teacher } from '../models/teacher.model';
import { CreateTeacherDto } from './dto/create-teacher.dto';
import { UpdateTeacherDto } from './dto/update-teacher.dto';
import { Roles } from '../auth/roles.decorator';
import { JwtGuard } from '../auth/jwt.guard';
import { RolesGuard } from '../auth/roles.guard';

@Controller('api/teachers')
export class TeachersController {

  constructor(private teachersService: TeachersService) {
  }

  @Get()
  getAll(@Query('with') withEntities: string): Promise<Teacher[]> {
    return this.teachersService.findAll(withEntities);
  }

  @Get(':id')
  getTeacher(
    @Param('id') teacherId: number,
    @Query('with') withEntities: string,
  ): Promise<Teacher> {
    return this.teachersService.findOne(teacherId, withEntities);
  }

  @Roles('admin')
  @UseGuards(JwtGuard, RolesGuard)
  @Post()
  addTeacher(@Body() teacherDto: CreateTeacherDto) {
    return this.teachersService.create(teacherDto);
  }

  @Roles('admin')
  @UseGuards(JwtGuard, RolesGuard)
  @Patch(':id')
  updateTeacher(
    @Param('id') id: number,
    @Body() teacherDto: UpdateTeacherDto,
  ) {
    return this.teachersService.update(id, teacherDto);
  }

  @Roles('admin')
  @UseGuards(JwtGuard, RolesGuard)
  @Delete(':id')
  deleteTeacher(@Param('id') id: number) {
    return this.teachersService.delete(id);
  }
}
