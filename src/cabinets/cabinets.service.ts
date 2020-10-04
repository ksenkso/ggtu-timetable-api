import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Cabinet } from '../models/cabinet.model';
import { CreateCabinetDto } from './dto/create-cabinet.dto';
import { UpdateCabinetDto } from './dto/update-cabinet.dto';
import IncludeFactory from '../utils/IncludeFactory';
import { Building } from '../models/building.model';

@Injectable()
export class CabinetsService {
  private includeFactory: IncludeFactory;

  constructor(
    @InjectModel(Cabinet)
    private cabinets: typeof Cabinet,
  ) {
    this.includeFactory = new IncludeFactory({ buildings: 'building' });
  }

  findAll(withEntities: string): Promise<Cabinet[]> {
    return this.cabinets
      .findAll({ include: this.includeFactory.build(withEntities) })
      .all();
  }

  async findOne(id: number, withEntities: string) {
    return this.cabinets.findByPk(id, { include: this.includeFactory.build(withEntities) });
  }

  async create(data: CreateCabinetDto): Promise<Cabinet> {
    if (!data.name) {
      if (data.number) {
        data.name = `Кабинет ${data.number}`;
      } else {
        throw new UnprocessableEntityException('Кабинет должен иметь номер или имя');
      }
    }
    const cabinet = await this.cabinets.create(data);
    return this.cabinets.findByPk(cabinet.id, { include: [{ model: Building }] });
  }

  async delete(id: number): Promise<number> {
    return this.cabinets.destroy({ where: { id } })
      .then(() => id);
  }

  async update(id: number, data: UpdateCabinetDto) {
    console.log(data);
    await this.cabinets.update(data, { where: { id } });
    return this.cabinets.findByPk(id, { include: [{ model: Building }] });
  }
}
