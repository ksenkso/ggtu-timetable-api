import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { BuildingsService } from './buildings.service';
import { Building } from '../models/building.model';
import { Roles } from '../auth/roles.decorator';
import { RolesGuard } from '../auth/roles.guard';
import { JwtGuard } from '../auth/jwt.guard';

@Controller('api/buildings')
export class BuildingsController {
  constructor(private buildingsService: BuildingsService) {
  }

  @Get()
  getAll(@Query('with') withEntities): Promise<Building[]> {
    return this.buildingsService.findAll(withEntities);
  }

  @Get(':id')
  getBuilding(
    @Param('id') teacherId: number,
    @Query('with') withEntities,
  ): Promise<Building> {
    return this.buildingsService.findOne(teacherId, withEntities);
  }

  @Roles('admin')
  @UseGuards(JwtGuard, RolesGuard)
  @Post()
  addBuilding(@Body('name') name: string) {
    return this.buildingsService.create({ name });
  }

  @Roles('admin')
  @UseGuards(JwtGuard, RolesGuard)

  @Patch(':id')
  updateBuilding(
    @Param('id') id: number,
    @Body('name') name: string,
  ) {
    return this.buildingsService.update(id, { name });
  }

  @Roles('admin')
  @UseGuards(JwtGuard, RolesGuard)
  @Delete(':id')
  deleteBuilding(@Param('id') id: number) {
    return this.buildingsService.delete(id);
  }
}
