import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { TimetablePatch } from '../models/patch.model';
import { Week } from '../models/timetable-entry.model';
import { CreateTimetableEntryDto } from '../timetable/dto/create-timetable-entry.dto';
import { UpdateTimetableEntryDto } from '../timetable/dto/update-timetable-entry.dto';
import { FindOptions } from 'sequelize';
import { Teacher } from '../models/teacher.model';
import { Lesson } from '../models/lesson.model';
import { Cabinet } from '../models/cabinet.model';
import { TeacherPatch } from '../models/teacher-patch.model';
import { defaultRels, EntryPropId } from '../timetable/timetable.service';

@Injectable()
export class PatchesService {
  constructor(
    @InjectModel(TimetablePatch)
    private patches: typeof TimetablePatch,
    @InjectModel(TeacherPatch)
    private teacherPatchJoins: typeof TeacherPatch,
  ) {}

  findAll(): Promise<TimetablePatch[]> {
    return this.patches.findAll({
      include: defaultRels,
    }).all();
  }

  async findOne(id: number) {
    return this.patches.findByPk(id, {
      include: defaultRels,
    });
  }

  async create(data: CreateTimetableEntryDto): Promise<TimetablePatch> {
    const { teacherIds } = data;
    delete data.teacherIds;
    const patch = await this.patches.create(data);
    await this.teacherPatchJoins.bulkCreate(teacherIds.map(teacherId => ({
      teacherId,
      timetableEntryId: patch.id,
    })));
    return this.patches.findByPk(patch.id, {
      include: defaultRels,
    });
  }

  async delete(id: number): Promise<number> {
    return this.patches.destroy({ where: { id } });
  }

  async update(id: number, data: UpdateTimetableEntryDto): Promise<TimetablePatch> {
    if (data.teacherIds && data.teacherIds.length) {
      await this.teacherPatchJoins.destroy({ where: { timetableEntryId: id } });
      await this.teacherPatchJoins.bulkCreate(data.teacherIds.map(teacherId => ({
        teacherId,
        timetableEntryId: id,
      })));
    }
    delete data.teacherIds;
    await this.patches.update(data, { where: { id } });
    return this.patches.findByPk(id, {
      include: defaultRels,
    });
  }

  async forTeacher(teacherId: number, week?: Week): Promise<TimetablePatch[]> {
    const options: FindOptions = {
      include: [
        { model: Teacher, through: { attributes: [], where: { teacherId } } },
        { model: Lesson },
        { model: Cabinet },
      ],
      where: {},
    };
    if (week === Week.Top || week === Week.Bottom) {
      options.where['week'] = week;
    }
    const entries = await this.patches.findAll(options);
    return Promise.all(entries.map(entry => {
      return entry.$get('teachers')
        .then(teachers => {
          entry.set('teachers', teachers);
          return entry;
        });
    }));
  }

  async forEntryPropId(key: EntryPropId, id: number, week?: Week): Promise<TimetablePatch[]> {
    const options: FindOptions = {
      where: {
        [key]: id,
      },
      include: defaultRels,
    };
    if (week === Week.Top || week === Week.Bottom) {
      options.where['week'] = week;
    }
    return this.patches.findAll(options);
  }
}
