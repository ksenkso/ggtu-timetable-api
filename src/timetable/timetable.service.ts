import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { TimetableEntry, Week } from "../models/timetable-entry.model";
import { CreateTimetableEntryDto } from "./dto/create-timetable-entry.dto";
import { UpdateTimetableEntryDto } from "./dto/update-timetable-entry.dto";
import { TeacherTimetable } from "../models/teacher-timetable.model";
import { Teacher } from "../models/teacher.model";
import { FindOptions } from "sequelize";
import { Lesson } from "../models/lesson.model";
import { Cabinet } from "../models/cabinet.model";

@Injectable()
export class TimetablesService {

  constructor(
    @InjectModel(TimetableEntry)
    private entries: typeof TimetableEntry,
    @InjectModel(TeacherTimetable)
    private teacherTimetableJoins: typeof TeacherTimetable,
  ) {
  }

  findAll(): Promise<TimetableEntry[]> {
    return this.entries.findAll({
      include: [
        { model: Teacher, through: { attributes: [] } },
        { model: Lesson },
        { model: Cabinet },
      ],
    }).all();
  }

  async findOne(id: number) {
    return this.entries.findByPk(id, {
      include: [
        { model: Teacher, through: { attributes: [] } },
        { model: Lesson },
        { model: Cabinet },
      ],
    });
  }

  async create(data: CreateTimetableEntryDto): Promise<TimetableEntry> {
    const { teacherIds } = data;
    delete data.teacherIds;
    const entry = await this.entries.create(data);
    await this.teacherTimetableJoins.bulkCreate(teacherIds.map(teacherId => ({
      teacherId,
      timetableEntryId: entry.id,
    })));
    return this.entries.findByPk(entry.id, {
      include: [
        { model: Teacher, through: { attributes: [] } },
        { model: Lesson },
        { model: Cabinet },
      ],
    });
  }

  async delete(id: number): Promise<number> {
    return this.entries.destroy({ where: { id } });
  }

  async update(id: number, data: UpdateTimetableEntryDto) {
    if (data.teacherIds && data.teacherIds.length) {
      await this.teacherTimetableJoins.destroy({ where: { timetableEntryId: id } });
      await this.teacherTimetableJoins.bulkCreate(data.teacherIds.map(teacherId => ({
        teacherId,
        timetableEntryId: id,
      })));
    }
    delete data.teacherIds;
    await this.entries.update(data, { where: { id } });
    return this.entries.findByPk(id, {
      include: [
        { model: Teacher, through: { attributes: [] } },
        { model: Lesson },
        { model: Cabinet },
      ],
    });
  }

  async forGroup(groupId: number, week?: number): Promise<TimetableEntry[]> {
    const options: FindOptions = {
      where: {
        groupId,
      },
      include: [
        { model: Teacher, through: { attributes: [] } },
        { model: Lesson },
        { model: Cabinet },
      ],
    };
    if (week === Week.Top || week === Week.Bottom) {
      options.where["week"] = week;
    }
    return this.entries.findAll(options);
  }
}
