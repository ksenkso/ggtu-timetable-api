import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { TimetablePatch } from '../models/patch.model';
import { Week } from '../models/timetable-entry.model';
import { FindOptions } from 'sequelize';
import { Teacher } from '../models/teacher.model';
import { Lesson } from '../models/lesson.model';
import { Cabinet } from '../models/cabinet.model';
import { TeacherPatch } from '../models/teacher-patch.model';
import { EntryPropId } from '../timetable/timetable.service';
import { UpdatePatchEntryDto } from './dto/update-patch-entry.dto';
import { CreatePatchEntryDto } from './dto/create-patch-entry.dto';
import { PatchDate } from '../models/patch-date';
import { Building } from '../models/building.model';

const defaultRelations = [
  // { model: PatchDate },
  { association: 'patchDates' },
  { model: Teacher, through: { attributes: [] } },
  { model: Lesson },
  {
    model: Cabinet, include: [
      { model: Building },
    ],
  },
];


@Injectable()
export class PatchesService {
  private logger = new Logger(PatchesService.name);

  constructor(
    @InjectModel(TimetablePatch)
    private patches: typeof TimetablePatch,
    @InjectModel(TeacherPatch)
    private teacherPatchJoins: typeof TeacherPatch,
    @InjectModel(PatchDate)
    private patchDates: typeof PatchDate,
  ) {
  }

  findAll(): Promise<TimetablePatch[]> {
    return this.patches.findAll({
      include: defaultRelations,
    }).all();
  }

  async findOne(id: number) {
    return this.patches.findByPk(id, {
      include: defaultRelations,
    });
  }

  async create(data: CreatePatchEntryDto): Promise<TimetablePatch> {
    // afterSave hook doesn't work, i don't know why,
    // so i just update related data here
    this.logger.log(data);
    const { teacherIds, dates } = data;
    delete data.teacherIds;
    delete data.dates;
    const patch = await this.patches.create(data);
    await this.patchDates.destroy({ where: { patchId: patch.id } });
    await this.patchDates.bulkCreate(dates.map(date => ({
      date,
      patchId: patch.id,
    })));
    await this.teacherPatchJoins.bulkCreate(teacherIds.map(teacherId => ({
      teacherId,
      timetablePatchId: patch.id,
    })));

    return this.patches.findByPk(patch.id, {
      include: defaultRelations,
    });
  }

  async delete(id: number): Promise<number> {
    return this.patches.destroy({ where: { id } })
      .then(() => id);
  }

  /**
   * @see PatchesService#create
   * @param id
   * @param data
   */
  async update(id: number, data: UpdatePatchEntryDto): Promise<TimetablePatch> {
    if (data.teacherIds && data.teacherIds.length) {
      await this.teacherPatchJoins.destroy({ where: { timetablePatchId: id } });
      await this.teacherPatchJoins.bulkCreate(data.teacherIds.map(teacherId => ({
        teacherId,
        timetablePatchId: id,
      })));
    }
    delete data.teacherIds;
    if (data.dates && data.dates.length) {
      const { dates } = data;
      delete data.dates;
      await this.patchDates.destroy({ where: { patchId: id } });
      await this.patchDates.bulkCreate(dates.map(date => ({
        date,
        patchId: id,
      })));
    }
    console.log(data);
    await this.patches.update(data, { where: { id }, });
    return this.patches.findByPk(+id, {
      include: defaultRelations,
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
      include: defaultRelations,
    };
    if (week === Week.Top || week === Week.Bottom) {
      options.where['week'] = week;
    }
    return this.patches.findAll(options);
  }
}
