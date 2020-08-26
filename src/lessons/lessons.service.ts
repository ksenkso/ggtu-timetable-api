import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Lesson } from '../models/lesson.model';
import { CreateLessonDto } from './dto/create-lesson.dto';
import { UpdateLessonDto } from './dto/update-lesson.dto';

@Injectable()
export class LessonsService {

    constructor(
        @InjectModel(Lesson)
        private lessons: typeof Lesson,
    ) {}

    findAll(): Promise<Lesson[]> {
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

    async create(data: CreateLessonDto): Promise<Lesson> {
        const lesson = new Lesson(data);
        return lesson.save();
    }

    async delete(id: number): Promise<number> {
        return this.lessons.destroy({ where: { id } })
          .then(() => id);
    }

    async update(id: number, data: UpdateLessonDto) {
        return this.lessons.update(data, { where: { id } });
    }
}
