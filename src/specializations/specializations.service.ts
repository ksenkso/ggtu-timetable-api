import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateSpecializationDto } from './dto/create-specialization.dto';
import { UpdateSpecializationDto } from './dto/update-specialization.dto';
import IncludeFactory from '../utils/IncludeFactory';
import { Specialization } from '../models/specialization.model';

@Injectable()
export class SpecializationsService {
  private includeFactory: IncludeFactory;

  constructor(
    @InjectModel(Specialization)
    private specs: typeof Specialization,
  ) {
    this.includeFactory = new IncludeFactory({ cabinets: 'cabinets' });
  }

  findAll(withEntities = ''): Promise<Specialization[]> {
    return this.specs.findAll({ include: this.includeFactory.build(withEntities) }).all();
  }

  async findOne(id: number, withEntities = '') {
    const building = await this.specs.findByPk(id, { include: this.includeFactory.build(withEntities) });
    if (building) {
      return building;
    } else {
      throw new NotFoundException('Здание не найдено');
    }
  }

  async create(data: CreateSpecializationDto): Promise<Specialization> {
    const building = new Specialization(data);
    return building.save();
  }

  async delete(id: number): Promise<number> {
    return this.specs.destroy({ where: { id } })
      .then(() => id);
  }

  async update(id: number, data: UpdateSpecializationDto) {
    await this.specs.update(data, { where: { id } });
    return this.specs.findByPk(id);
  }
}
