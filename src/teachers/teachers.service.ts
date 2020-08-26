import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Teacher } from '../models/teacher.model';
import { UpdateTeacherDto } from './dto/update-teacher.dto';
import { CreateTeacherDto } from './dto/create-teacher.dto';

@Injectable()
export class TeachersService {
    constructor(
        @InjectModel(Teacher)
        private teachers: typeof Teacher
    ) {}

    findAll(): Promise<Teacher[]> {
        return this.teachers.findAll().all();
    }

    async findOne(id: number) {
        return this.teachers.findByPk(id);
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
