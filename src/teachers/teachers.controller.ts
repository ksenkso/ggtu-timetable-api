import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { TeachersService } from './teachers.service';
import { Teacher } from '../models/teacher.model';

@Controller('api/teachers')
export class TeachersController {

    constructor(private teachersService: TeachersService) {}

    @Get()
    getAll(@Query('with') withEntities: string): Promise<Teacher[]> {
        return this.teachersService.findAll(withEntities);
    }

    @Get(':id')
    getTeacher(
      @Param('id') teacherId: number,
      @Query('with') withEntities: string
  ): Promise<Teacher> {
        return this.teachersService.findOne(teacherId, withEntities);
    }

    @Post()
    addTeacher(@Body('name') name: string) {
        return this.teachersService.create({name});
    }

    @Patch(':id')
    updateTeacher(
        @Param('id') id: number,
        @Body('name') name: string
    ) {
        return this.teachersService.update(id, {name});
    }

    @Delete(':id')
    deleteTeacher(@Param('id') id: number) {
        return this.teachersService.delete(id);
    }
}
