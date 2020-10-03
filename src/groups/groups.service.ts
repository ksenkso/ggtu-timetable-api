import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Group } from '../models/group.model';
import { CreateGroupDto } from './dto/create-group.dto';
import { UpdateGroupDto } from './dto/update-group.dto';
import { Specialization } from '../models/specialization.model';
import { Faculty } from '../models/faculty.model';

@Injectable()
export class GroupsService {

  static relations = [
    { model: Specialization },
    { model: Faculty },
  ];

  constructor(
    @InjectModel(Group)
    private groups: typeof Group,
  ) {
  }

  findAll(): Promise<Group[]> {
    return this.groups.findAll({ include: GroupsService.relations }).all();
  }

  async findOne(id: number) {
    return this.groups.findByPk(id, { include: GroupsService.relations });
  }

  async create(data: CreateGroupDto): Promise<Group> {
    const group = await this.groups.create(data);
    return this.groups.findByPk(group.id, { include: GroupsService.relations });
  }

  async delete(id: number): Promise<number> {
    return this.groups.destroy({ where: { id } })
      .then(() => id);
  }

  async update(id: number, data: UpdateGroupDto) {
    await this.groups.update(data, { where: { id } });
    return this.groups.findByPk(id, { include: GroupsService.relations });
  }
}
