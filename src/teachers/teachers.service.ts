import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Teacher } from '../models/teacher.model';
import { UpdateTeacherDto } from './dto/update-teacher.dto';
import { CreateTeacherDto } from './dto/create-teacher.dto';
import IncludeFactory from '../utils/IncludeFactory';

@Injectable()
export class TeachersService {
    private includeFactory: IncludeFactory;
    constructor(
        @InjectModel(Teacher)
        private teachers: typeof Teacher
    ) {
        this.includeFactory = new IncludeFactory({timetable: 'lessons'});
    }

    findAll(withEntities = ''): Promise<Teacher[]> {
        return this.teachers.findAll({include: this.includeFactory.build(withEntities)}).all();
    }

    async findOne(id: number, withEntities = '') {
        return this.teachers.findByPk(id, {include: this.includeFactory.build(withEntities)});
    }

    async create(data: CreateTeacherDto): Promise<Teacher> {
        const user = new Teacher(data);
        return user.save();
    }

    async delete(id: number): Promise<number> {
        return this.teachers.destroy({where: {id}})
          .then(() => id);
    }

    async update(id: number, data: UpdateTeacherDto) {
        return this.teachers.update(data, {where: {id}});
    }
}
