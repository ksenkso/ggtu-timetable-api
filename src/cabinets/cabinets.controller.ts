import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { CabinetsService } from './cabinets.service';
import { Cabinet } from '../models/cabinet.model';
import IncludeFactory from '../utils/IncludeFactory';
import { CreateCabinetDto } from './dto/create-cabinet.dto';
import { UpdateCabinetDto } from './dto/update-cabinet.dto';

@Controller('api/cabinets')
export class CabinetsController {
  private includeFactory: IncludeFactory;

  constructor(private cabinetsService: CabinetsService) {
    this.includeFactory = new IncludeFactory({ buildings: 'buildings' });
  }

  @Get()
  getAll(@Query('with') withEntities: string): Promise<Cabinet[]> {
    return this.cabinetsService.findAll(withEntities);
  }

  @Get(':id')
  getCabinet(
    @Param('id') teacherId: number,
    @Query('with') withEntities: string,
  ): Promise<Cabinet> {
    return this.cabinetsService.findOne(teacherId, withEntities);
  }

  @Post()
  addCabinet(
    @Body() cabinetDto: CreateCabinetDto,
  ) {
    return this.cabinetsService.create(cabinetDto);
  }

  @Patch(':id')
  updateCabinet(
    @Param('id') id: number,
    @Body() cabinetDto: UpdateCabinetDto,
  ) {
    return this.cabinetsService.update(id, cabinetDto);
  }

  @Delete(':id')
  deleteCabinet(@Param('id') id: number) {
    return this.cabinetsService.delete(id);
  }
}
