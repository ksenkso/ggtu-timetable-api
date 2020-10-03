import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { SpecializationsService } from './specializations.service';
import { Specialization } from '../models/specialization.model';
import { CreateSpecializationDto } from './dto/create-specialization.dto';
import { UpdateSpecializationDto } from './dto/update-specialization.dto';

@Controller('api/specializations')
export class SpecializationsController {
    constructor(private specsService: SpecializationsService) {}

    @Get()
    getAll(@Query('with') withEntities): Promise<Specialization[]> {
        return this.specsService.findAll(withEntities);
    }

    @Get(':id')
    getSpecialization(
      @Param('id') teacherId: number,
      @Query('with') withEntities
  ): Promise<Specialization> {
        return this.specsService.findOne(teacherId, withEntities);
    }

    @Post()
    addSpecialization(@Body() specDto: CreateSpecializationDto) {
        return this.specsService.create(specDto);
    }

    @Patch(':id')
    updateSpecialization(
        @Param('id') id: number,
        @Body() specDto: UpdateSpecializationDto
    ) {
        return this.specsService.update(id, specDto);
    }

    @Delete(':id')
    deleteSpecialization(@Param('id') id: number) {
        return this.specsService.delete(id);
    }
}
