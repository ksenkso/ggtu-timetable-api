import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { SubjectsService } from './subjects.service';
import { Subject } from '../models/subject.model';
import { UpdateSubjectDto } from './dto/update-subject.dto';
import { CreateSubjectDto } from './dto/create-subject.dto';
import { Roles } from '../auth/roles.decorator';
import { JwtGuard } from '../auth/jwt.guard';
import { RolesGuard } from '../auth/roles.guard';

@Controller('api/subjects')
export class SubjectsController {
  constructor(private subjectsService: SubjectsService) {
  }

  @Get()
  getAll(): Promise<Subject[]> {
    return this.subjectsService.findAll();
  }

  @Get(':id')
  getLesson(@Param('id') teacherId: number): Promise<Subject> {
    return this.subjectsService.findOne(teacherId);
  }

  @Roles('admin')
  @UseGuards(JwtGuard, RolesGuard)
  @Post()
  addSubject(
    @Body() subjectDto: CreateSubjectDto,
  ) {
    return this.subjectsService.create(subjectDto);
  }

  @Roles('admin')
  @UseGuards(JwtGuard, RolesGuard)
  @Patch(':id')
  updateSubject(
    @Param('id') id: number,
    @Body() subjectDto: UpdateSubjectDto,
  ) {
    return this.subjectsService.update(id, subjectDto);
  }

  @Roles('admin')
  @UseGuards(JwtGuard, RolesGuard)
  @Delete(':id')
  deleteLesson(@Param('id') id: number) {
    return this.subjectsService.delete(id);
  }
}
