import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Subject } from '../models/subject.model';
import { CreateSubjectDto } from './dto/create-subject.dto';
import { UpdateSubjectDto } from './dto/update-subject.dto';

@Injectable()
export class SubjectsService {

  constructor(
    @InjectModel(Subject)
    private subject: typeof Subject,
  ) {
  }

  findAll(): Promise<Subject[]> {
    return this.subject.findAll().all();
  }

  async findOne(id: number) {
    const lesson = await this.subject.findByPk(id);
    if (lesson) {
      return lesson;
    } else {
      throw new NotFoundException('Урок не найден');
    }
  }

  async create(data: CreateSubjectDto): Promise<Subject> {
    const lesson = await this.subject.create(data);
    return this.subject.findByPk(lesson.id);
  }

  async delete(id: number): Promise<number> {
    return this.subject.destroy({ where: { id } })
      .then(() => id);
  }

  async update(id: number, data: UpdateSubjectDto) {
    await this.subject.update(data, { where: { id } });
    return this.subject.findByPk(id);
  }
}
