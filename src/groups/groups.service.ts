import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Group } from '../models/group.model';
import { CreateGroupDto } from './dto/create-group.dto';
import { UpdateGroupDto } from './dto/update-group.dto';

@Injectable()
export class GroupsService {

    constructor(
        @InjectModel(Group)
        private groups: typeof Group,
    ) {}

    findAll(): Promise<Group[]> {
        return this.groups.findAll().all();
    }

    async findOne(id: number) {
        return this.groups.findByPk(id);
    }

    async create(data: CreateGroupDto): Promise<Group> {
        const group = new Group(data);
        return group.save();
    }

    async delete(id: number): Promise<number> {
        return this.groups.destroy({ where: { id } })
          .then(() => id);
    }

    async update(id: number, data: UpdateGroupDto) {
        return this.groups.update(data, { where: { id } });
    }
}
