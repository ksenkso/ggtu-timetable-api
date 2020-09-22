import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Building } from '../models/building.model';
import { CreateBuildingDto } from './dto/create-building.dto';
import { UpdateBuildingDto } from './dto/update-building.dto';
import IncludeFactory from '../utils/IncludeFactory';

@Injectable()
export class BuildingsService {
  private includeFactory: IncludeFactory;

  constructor(
    @InjectModel(Building)
    private buildings: typeof Building,
  ) {
    this.includeFactory = new IncludeFactory({ cabinets: 'cabinets' });
  }

  findAll(withEntities = ''): Promise<Building[]> {
    return this.buildings.findAll({ include: this.includeFactory.build(withEntities) }).all();
  }

  async findOne(id: number, withEntities = '') {
    const building = await this.buildings.findByPk(id, { include: this.includeFactory.build(withEntities) });
    if (building) {
      return building;
    } else {
      throw new NotFoundException('Здание не найдено');
    }
  }

  async create(data: CreateBuildingDto): Promise<Building> {
    const building = new Building(data);
    return building.save();
  }

  async delete(id: number): Promise<number> {
    return this.buildings.destroy({ where: { id } })
      .then(() => id);
  }

  async update(id: number, data: UpdateBuildingDto) {
    return this.buildings.update(data, { where: { id } });
  }
}
