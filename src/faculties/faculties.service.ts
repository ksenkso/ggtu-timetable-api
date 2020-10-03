import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Faculty } from '../models/faculty.model';
import { CreateFacultyDto } from './dto/create-faculty.dto';
import { UpdateFacultyDto } from './dto/update-faculty.dto';
import IncludeFactory from '../utils/IncludeFactory';

@Injectable()
export class FacultiesService {
  private includeFactory: IncludeFactory;

  constructor(
    @InjectModel(Faculty)
    private faculties: typeof Faculty,
  ) {
    this.includeFactory = new IncludeFactory({ cabinets: 'cabinets' });
  }

  findAll(withEntities = ''): Promise<Faculty[]> {
    return this.faculties.findAll({ include: this.includeFactory.build(withEntities) }).all();
  }

  async findOne(id: number, withEntities = '') {
    const building = await this.faculties.findByPk(id, { include: this.includeFactory.build(withEntities) });
    if (building) {
      return building;
    } else {
      throw new NotFoundException('Здание не найдено');
    }
  }

  async create(data: CreateFacultyDto): Promise<Faculty> {
    const faculty = await this.faculties.create(data);
    return this.faculties.findByPk(faculty.id);
  }

  async delete(id: number): Promise<number> {
    return this.faculties.destroy({ where: { id } })
      .then(() => id);
  }

  async update(id: number, data: UpdateFacultyDto) {
    await this.faculties.update(data, { where: { id } });
    return this.faculties.findByPk(id);
  }
}
