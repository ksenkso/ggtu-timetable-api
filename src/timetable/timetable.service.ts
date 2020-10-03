import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateLessonDto } from './dto/create-lesson.dto';
import { UpdateLessonDto } from './dto/update-lesson.dto';
import { TeacherTimetable } from '../models/teacher-timetable.model';
import { Teacher } from '../models/teacher.model';
import { FindOptions, WhereOptions } from 'sequelize';
import { Subject } from '../models/subject.model';
import { Cabinet } from '../models/cabinet.model';
import { Building } from '../models/building.model';
import { Lesson } from '../models/lesson.model';
import { RegularTimetable, Week } from '../models/regular-timetable';
import { User } from '../models/user.model';
import { Group } from '../models/group.model';
import { PatchTimetable } from '../models/patch-timetable';
import { CreatePatchDto } from '../patches/dto/create-patch.dto';
import { UpdatePatchDto } from '../patches/dto/update-patch.dto';
export type LessonForeignKey = 'lessonId' | 'groupId' | 'cabinetId';

interface ForLessonPropIdParams {
  key: LessonForeignKey;
  id: number;
  week?: Week;
  isRegular?: boolean;
}

@Injectable()
export class TimetablesService {

  static defaultRelations = [
    { model: Teacher, through: { attributes: [] } },
    { model: Subject },
    {
      model: Cabinet, include: [
        { model: Building },
      ],
    },
    { model: RegularTimetable },
    { model: PatchTimetable },
  ];

  constructor(
    @InjectModel(Lesson)
    private lesson: typeof Lesson,
    @InjectModel(TeacherTimetable)
    private teacherTimetable: typeof TeacherTimetable,
    @InjectModel(Group)
    private group: typeof Group,
    @InjectModel(Teacher)
    private teacher: typeof Teacher,
  ) {
  }

  findAll(where?: WhereOptions): Promise<Lesson[]> {
    return this.lesson.findAll({
      include: TimetablesService.defaultRelations,
      where,
    }).all();
  }

  async findOne(id: number) {
    const lesson = this.lesson.findByPk(id, {
      include: TimetablesService.defaultRelations,
    });
    if (lesson) {
      return lesson;
    } else {
      throw new NotFoundException('Занятие не найдено');
    }
  }

  async create(user: User, data: CreateLessonDto | CreatePatchDto): Promise<Lesson> {
    await this.checkAccess(user, data.groupId);
    const { teacherIds } = data;
    delete data.teacherIds;
    const lesson = await this.lesson.create(data);
    await this.teacherTimetable.bulkCreate(teacherIds.map(teacherId => ({
      teacherId,
      lessonId: lesson.id,
    }) as { [key in keyof TeacherTimetable]: any }));
    return this.lesson.findByPk(lesson.id, {
      include: TimetablesService.defaultRelations,
    });
  }

  async delete(user: User, id: number): Promise<number> {
    const lesson = await this.lesson.findByPk(id);
    if (lesson) {
      await this.checkAccess(user, lesson.groupId);
      return lesson.destroy()
        .then(() => id);
    } else {
      throw new NotFoundException('Занятие не найдено');
    }
  }

  async update(user: User, id: number, data: UpdateLessonDto | UpdatePatchDto) {
    const lesson = await this.lesson.findByPk(id);
    if (lesson) {
      await this.checkAccess(user, lesson.groupId);
      if (data.groupId) {
        // check access for user-provided groupId
        await this.checkAccess(user, data.groupId);
      }
      if (data.teacherIds && data.teacherIds.length) {
        await this.teacherTimetable.destroy({ where: { timetableEntryId: id } });
        await this.teacherTimetable.bulkCreate(data.teacherIds.map(teacherId => ({
          teacherId,
          timetableEntryId: id,
        })));
      }
      delete data.teacherIds;
      await lesson.update(data);
      return this.lesson.findByPk(id, {
        include: TimetablesService.defaultRelations,
      });
    } else {
      throw new NotFoundException('Занятие не найдено');
    }
  }

  async forTeacher(teacherId: number, isRegular = true, week?: Week): Promise<Lesson[]> {
    const options: FindOptions = {
      where: { isRegular },
    };
    options.include = TimetablesService.defaultRelations.slice(0); // clone the array
    options.include.splice(0, 1, { model: Teacher, through: { attributes: [], where: { teacherId } } });
    TimetablesService.setWeekOption(week, options);
    return this.lesson.findAll(options);
  }

  async forLessonPropId({ key, id, week, isRegular = true }: ForLessonPropIdParams): Promise<Lesson[]> {
    const options: FindOptions = {
      where: {
        [key]: id,
        isRegular,
      },
      include: TimetablesService.defaultRelations,
    };
    TimetablesService.setWeekOption(week, options);
    return this.lesson.findAll(options);
  }

  private static setWeekOption(week: Week, options: FindOptions) {
    if (week === Week.Top || week === Week.Bottom) {
      options.where['week'] = week;
    }
  }

  private async checkAccess(user: User, groupId: number) {
    const group = await this.group.findByPk(groupId);
    console.log(user, user.facultyId, group.facultyId);
    if (group && +user.facultyId !== +group.facultyId) {
      throw new UnauthorizedException('Вы не можете изменять расписание этой группы');
    }
  }
}
