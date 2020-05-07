import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Cabinet } from '../models/cabinet.model';
import { CreateCabinetDto } from './dto/create-cabinet.dto';
import { UpdateCabinetDto } from './dto/update-cabinet.dto';

@Injectable()
export class CabinetsService {

    constructor(
        @InjectModel(Cabinet)
        private cabinets: typeof Cabinet,
    ) {}

    findAll(): Promise<Cabinet[]> {
        return this.cabinets.findAll().all();
    }

    async findOne(id: number) {
        return this.cabinets.findByPk(id);
    }

    async create(data: CreateCabinetDto): Promise<Cabinet> {
        if (!data.name) {
            if (data.number) {
                data.name = `Кабинет ${data.number}`;
            } else {
                throw new UnprocessableEntityException('Кабинет должен иметь номер или имя');
            }
        }
        const cabinet = new Cabinet(data);
        return cabinet.save();
    }

    async delete(id: number): Promise<number> {
        return this.cabinets.destroy({ where: { id } });
    }

    async update(id: number, data: UpdateCabinetDto) {
        return this.cabinets.update(data, { where: { id } });
    }
}
