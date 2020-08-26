import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Building } from '../models/building.model';
import { CreateBuildingDto } from './dto/create-building.dto';
import { UpdateBuildingDto } from './dto/update-building.dto';

@Injectable()
export class BuildingsService {

    constructor(
        @InjectModel(Building)
        private buildings: typeof Building,
    ) {}

    findAll(): Promise<Building[]> {
        return this.buildings.findAll().all();
    }

    async findOne(id: number) {
        const building = await this.buildings.findByPk(id);
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
