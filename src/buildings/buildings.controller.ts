import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { BuildingsService } from './buildings.service';
import { Building } from '../models/building.model';

@Controller('api/buildings')
export class BuildingsController {
    constructor(private buildingsService: BuildingsService) {}

    @Get()
    getAll(@Query('with') withEntities): Promise<Building[]> {
        return this.buildingsService.findAll(withEntities);
    }

    @Get(':id')
    getBuilding(
      @Param('id') teacherId: number,
      @Query('with') withEntities
  ): Promise<Building> {
        return this.buildingsService.findOne(teacherId, withEntities);
    }

    @Post()
    addBuilding(@Body('name') name: string) {
        return this.buildingsService.create({name});
    }

    @Patch(':id')
    updateBuilding(
        @Param('id') id: number,
        @Body('name') name: string
    ) {
        return this.buildingsService.update(id, {name});
    }

    @Delete(':id')
    deleteBuilding(@Param('id') id: number) {
        return this.buildingsService.delete(id);
    }
}
