import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { CabinetsService } from './cabinets.service';
import { Cabinet } from '../models/cabinet.model';

@Controller('api/cabinets')
export class CabinetsController {
    constructor(private cabinetsService: CabinetsService) {}

    @Get()
    getAll(): Promise<Cabinet[]> {
        return this.cabinetsService.findAll();
    }

    @Get(':id')
    getCabinet(@Param('id') teacherId: number): Promise<Cabinet> {
        return this.cabinetsService.findOne(teacherId);
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
