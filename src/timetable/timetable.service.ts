import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateLessonDto } from './dto/create-lesson.dto';
import { UpdateLessonDto } from './dto/update-lesson.dto';
import { TeacherTimetable } from '../models/teacher-timetable.model';
import { Teacher } from '../models/teacher.model';
import * as sequelize from 'sequelize';
import { FindOptions, IncludeOptions, Op } from 'sequelize';
import { Subject } from '../models/subject.model';
import { Cabinet } from '../models/cabinet.model';
import { Building } from '../models/building.model';
import { Lesson } from '../models/lesson.model';
import { Day, RegularTimetable, Week } from '../models/regular-timetable';
import { User } from '../models/user.model';
import { Group } from '../models/group.model';
import { PatchTimetable } from '../models/patch-timetable';
import { CreatePatchDto } from '../patches/dto/create-patch.dto';
import { UpdatePatchDto } from '../patches/dto/update-patch.dto';

export type LessonForeignKey = 'subjectId' | 'groupId' | 'cabinetId';

interface ForLessonPropIdParams {
  key: LessonForeignKey;
  id: number;
  week?: Week;
  isRegular?: boolean;
  range?: [Date, Date];
}

@Injectable()
export class TimetablesService {

  static get defaultRelations(): IncludeOptions[] {
    return [
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
  };

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

  findAll({ isRegular, range}: {isRegular: boolean, range?: [string, string]} = {isRegular: true}): Promise<Lesson[]> {
    const options = {
      include: TimetablesService.defaultRelations,
      where: { isRegular },
    };
    if (range) {
      options.include.pop();
      options.include.push({
        model: PatchTimetable,
        where: {
          date: {
            [Op.between]: range,
          },
        },
      });
    }
    return this.lesson.findAll(options).all();
  }

  async findOne(id: number) {
    const lesson = await this.lesson.findByPk(id, {
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
      console.log(JSON.stringify(data));
      if (data.teacherIds && data.teacherIds.length) {
        await this.teacherTimetable.destroy({ where: { lessonId: id } });
        await this.teacherTimetable.bulkCreate(data.teacherIds.map(teacherId => ({
          teacherId,
          lessonId: id,
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

  async forTeacher(teacherId: number, isRegular = true, week?: Week): Promise<any> {
    const options: FindOptions = {
      where: {
        [Op.and]: [
          { isRegular },
          // MAY CHANGE IN FUTURE
          // this col is from the raw sql that is sequelize outputs when querying lessons
          sequelize.literal('`teachers->TeacherTimetable`.`teacherId` = ' + teacherId),
        ],
      },
      include: TimetablesService.defaultRelations,
    };
    TimetablesService.setWeekOption(week, options);
    const lessons = await this.lesson.findAll(options);
    return TimetablesService.formatTimetable(lessons, isRegular, week);
  }

  async forLessonPropId({ key, id, week, range, isRegular = true }: ForLessonPropIdParams): Promise<any> {
    const options: FindOptions = {
      where: {
        [key]: id,
        isRegular,
      },
      include: TimetablesService.defaultRelations,
    };
    if (range) {
      options.where['date'] = {
        [Op.between]: range,
      };
    }
    TimetablesService.setWeekOption(week, options);
    const lessons = (await this.lesson.findAll(options));
    return TimetablesService.formatTimetable(lessons, isRegular, week);
  }

  private static formatTimetable(lessons: Lesson[], isRegular: boolean, week: Week | Week.Top | Week.Bottom) {
    if (!isRegular) {
      return lessons;
    } else {
      const timetable = TimetablesService.conformTimetable(lessons);
      if (week !== undefined) {
        return timetable[week];
      } else {
        return timetable;
      }
    }
  }

  private static setWeekOption(week: Week, options: FindOptions) {
    if (week === Week.Top || week === Week.Bottom) {
      const index = options.include.findIndex(option => (option as IncludeOptions).model === RegularTimetable);
      if (index !== -1) {
        options.include.splice(index, 1);
      }
      options.include.push({ model: RegularTimetable, where: { week } });
    }
  }

  private async checkAccess(user: User, groupId: number) {
    const group = await this.group.findByPk(groupId);
    console.log(user, user.facultyId, group.facultyId);
    if (group && +user.facultyId !== +group.facultyId) {
      throw new UnauthorizedException('Вы не можете изменять расписание этой группы');
    }
  }

  private static conformTimetable(lessons: Lesson[]) {
    const json = lessons.map(lesson => lesson.toJSON());
    const timetable = [
      TimetablesService.createDays(),
      TimetablesService.createDays(),
    ];
    json.reduce((table, lesson) => {
      table[lesson['week']][lesson['day']].push(lesson);
      return table;
    }, timetable);
    for (const week of timetable) {
      for (const dayIndex in week) {
        if (!week.hasOwnProperty(dayIndex)) {
          continue;
        }
        const day = week[dayIndex];
        day.sort((a, b) => (a as Lesson).index - (b as Lesson).index);
        /**
         * The main idea: go through subjects, if lesson's index is not equal to expected lesson index,
         * then there is no lesson defined, so only set an id;
         * increment expected index every iteration, go to next lesson only if indices are equal.
         */
        let expectedSerialNumber = 0, lessonIndex = 0;
        while (lessonIndex < day.length) {
          // current lesson is not the lesson we are looking for, so there is no lesson for current index
          if ((day[lessonIndex] as Lesson).index !== expectedSerialNumber) {
            day.splice(expectedSerialNumber, 0, null);
          } else {
            lessonIndex++;
          }
          expectedSerialNumber++;
        }
      }
    }
    return {
      [Week.Top]: timetable[0],
      [Week.Bottom]: timetable[1],
    };
  }

  private static createDays(): Record<string, (Lesson | null)[]> {
    return {
      [Day.Monday]: [],
      [Day.Tuesday]: [],
      [Day.Wednesday]: [],
      [Day.Thursday]: [],
      [Day.Friday]: [],
      [Day.Saturday]: [],
    };
  }
}
