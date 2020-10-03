import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { FacultiesService } from './faculties.service';
import { Faculty } from '../models/faculty.model';

@Controller('api/faculties')
export class FacultiesController {
    constructor(private facultiesService: FacultiesService) {}

    @Get()
    getAll(@Query('with') withEntities): Promise<Faculty[]> {
        return this.facultiesService.findAll(withEntities);
    }

    @Get(':id')
    getFaculty(
      @Param('id') teacherId: number,
      @Query('with') withEntities
  ): Promise<Faculty> {
        return this.facultiesService.findOne(teacherId, withEntities);
    }

    @Post()
    addFaculty(@Body('name') name: string) {
        return this.facultiesService.create({name});
    }

    @Patch(':id')
    updateFaculty(
        @Param('id') id: number,
        @Body('name') name: string
    ) {
        return this.facultiesService.update(id, {name});
    }

    @Delete(':id')
    deleteFaculty(@Param('id') id: number) {
        return this.facultiesService.delete(id);
    }
}
