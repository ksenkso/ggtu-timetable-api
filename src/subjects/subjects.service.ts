import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Subject } from '../models/subject.model';
import { CreateSubjectDto } from './dto/create-subject.dto';
import { UpdateSubjectDto } from './dto/update-subject.dto';

@Injectable()
export class SubjectsService {

    constructor(
        @InjectModel(Subject)
        private lessons: typeof Subject,
    ) {}

    findAll(): Promise<Subject[]> {
        return this.lessons.findAll().all();
    }

    async findOne(id: number) {
        const lesson = await this.lessons.findByPk(id);
        if (lesson) {
            return lesson;
        } else {
            throw new NotFoundException('Урок не найден');
        }
    }

    async create(data: CreateSubjectDto): Promise<Subject> {
        const lesson = new Subject(data);
        return lesson.save();
    }

    async delete(id: number): Promise<number> {
        return this.lessons.destroy({ where: { id } })
          .then(() => id);
    }

    async update(id: number, data: UpdateSubjectDto) {
        return this.lessons.update(data, { where: { id } });
    }
}
