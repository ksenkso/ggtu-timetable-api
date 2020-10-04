import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { CabinetsService } from './cabinets.service';
import { Cabinet } from '../models/cabinet.model';
import IncludeFactory from '../utils/IncludeFactory';
import { CreateCabinetDto } from './dto/create-cabinet.dto';
import { UpdateCabinetDto } from './dto/update-cabinet.dto';
import { Roles } from '../auth/roles.decorator';
import { JwtGuard } from '../auth/jwt.guard';
import { RolesGuard } from '../auth/roles.guard';

@Controller('api/cabinets')
export class CabinetsController {
  private includeFactory: IncludeFactory;

  constructor(private cabinetsService: CabinetsService) {
    this.includeFactory = new IncludeFactory({ buildings: 'buildings' });
  }

  @Get()
  getAll(): Promise<Cabinet[]> {
    return this.cabinetsService.findAll();
  }

  @Get(':id')
  getCabinet(
    @Param('id') teacherId: number,
  ): Promise<Cabinet> {
    return this.cabinetsService.findOne(teacherId);
  }

  @Roles('admin')
  @UseGuards(JwtGuard, RolesGuard)
  @Post()
  addCabinet(
    @Body() cabinetDto: CreateCabinetDto,
  ) {
    return this.cabinetsService.create(cabinetDto);
  }

  @Roles('admin')
  @UseGuards(JwtGuard, RolesGuard)
  @Patch(':id')
  updateCabinet(
    @Param('id') id: number,
    @Body() cabinetDto: UpdateCabinetDto,
  ) {
    return this.cabinetsService.update(id, cabinetDto);
  }

  @Roles('admin')
  @UseGuards(JwtGuard, RolesGuard)
  @Delete(':id')
  deleteCabinet(@Param('id') id: number) {
    return this.cabinetsService.delete(id);
  }
}
