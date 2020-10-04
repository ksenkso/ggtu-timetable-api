import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { SpecializationsService } from './specializations.service';
import { Specialization } from '../models/specialization.model';
import { CreateSpecializationDto } from './dto/create-specialization.dto';
import { UpdateSpecializationDto } from './dto/update-specialization.dto';
import { Roles } from '../auth/roles.decorator';
import { JwtGuard } from '../auth/jwt.guard';
import { RolesGuard } from '../auth/roles.guard';

@Controller('api/specializations')
export class SpecializationsController {
  constructor(private specsService: SpecializationsService) {
  }

  @Get()
  getAll(@Query('with') withEntities): Promise<Specialization[]> {
    return this.specsService.findAll(withEntities);
  }

  @Get(':id')
  getSpecialization(
    @Param('id') teacherId: number,
    @Query('with') withEntities,
  ): Promise<Specialization> {
    return this.specsService.findOne(teacherId, withEntities);
  }

  @Roles('admin')
  @UseGuards(JwtGuard, RolesGuard)
  @Post()
  addSpecialization(@Body() specDto: CreateSpecializationDto) {
    return this.specsService.create(specDto);
  }

  @Roles('admin')
  @UseGuards(JwtGuard, RolesGuard)
  @Patch(':id')
  updateSpecialization(
    @Param('id') id: number,
    @Body() specDto: UpdateSpecializationDto,
  ) {
    return this.specsService.update(id, specDto);
  }

  @Roles('admin')
  @UseGuards(JwtGuard, RolesGuard)
  @Delete(':id')
  deleteSpecialization(@Param('id') id: number) {
    return this.specsService.delete(id);
  }
}
