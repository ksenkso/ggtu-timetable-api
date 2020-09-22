import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { CabinetsService } from './cabinets.service';
import { Cabinet } from '../models/cabinet.model';
import IncludeFactory from '../utils/IncludeFactory';

@Controller('api/cabinets')
export class CabinetsController {
    private includeFactory: IncludeFactory;
    constructor(private cabinetsService: CabinetsService) {
        this.includeFactory = new IncludeFactory({buildings: 'buildings'});
    }

    @Get()
    getAll(@Query('with') withEntities: string): Promise<Cabinet[]> {
        return this.cabinetsService.findAll(withEntities);
    }

    @Get(':id')
    getCabinet(
      @Param('id') teacherId: number,
      @Query('with') withEntities: string
    ): Promise<Cabinet> {
        return this.cabinetsService.findOne(teacherId, withEntities);
    }

    @Post()
    addCabinet(
        @Body('name') name: string,
        @Body('number') number: number,
        @Body('floor') floor: number,
        @Body('buildingId') buildingId: number,
    ) {
        return this.cabinetsService.create({name, number, floor, buildingId});
    }

    @Patch(':id')
    updateCabinet(
        @Param('id') id: number,
        @Body('name') name: string,
        @Body('number') number: number,
        @Body('floor') floor: number,
        @Body('buildingId') buildingId: number,
    ) {
        return this.cabinetsService.update(id, {name, number, floor, buildingId});
    }

    @Delete(':id')
    deleteCabinet(@Param('id') id: number) {
        return this.cabinetsService.delete(id);
    }
}
