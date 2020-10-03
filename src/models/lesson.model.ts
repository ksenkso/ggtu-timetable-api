import {
  AfterSave,
  BelongsTo,
  BelongsToMany,
  Column,
  DataType,
  ForeignKey,
  HasMany,
  HasOne,
  Model,
  Table,
} from 'sequelize-typescript';
import { Subject } from './subject.model';
import { Teacher } from './teacher.model';
import { Cabinet } from './cabinet.model';
import { TeacherTimetable } from './teacher-timetable.model';
import { Group } from './group.model';
import { Day, RegularTimetable, Week } from './regular-timetable';
import { PatchTimetable } from './patch-timetable';

export enum TimetableEntryType {
  Lecture,
  Practice,
  Lab,
  Empty
}

@Table({ timestamps: false })
export class Lesson extends Model<Lesson> {

  @AfterSave
  static async syncDate(instance: Lesson, options: any) {
    console.log(options);
    console.log('running after save');
    if (instance.isRegular && instance.changed('day') || instance.changed('week')) {
      console.log('day or week has changed');
      if (instance.changed('id')) {
        console.log('new record');
        RegularTimetable.create(
          { day: instance.day, week: instance.week, lessonId: instance.id },
        );
      } else {
        console.log('updating existing record');
        RegularTimetable.update(
          { day: instance.day, week: instance.week },
          { where: { lessonId: instance.id } },
        );
      }

    } else if (!instance.isRegular && instance.changed('dates')) {
      console.log('dates have changed');
      await PatchTimetable.destroy({ where: { lessonId: instance.id } });
      await PatchTimetable.bulkCreate(instance.dates.map(date => ({
          date,
          lessonId: instance.id,
        }),
      ));
    }
  }

  @Column(DataType.VIRTUAL)
  get when() {
    if (this.isRegular) {
      const regular = this.getDataValue('regular');
      if (regular) {
        return {
          day: regular.day,
          week: regular.week,
        };
      }
    } else {
      return this.getDataValue('patches').map(patch => patch.date);
    }

  }

  toJSON(): object {
    const fields: any = super.toJSON();
    delete fields.patches;
    delete fields.regular;
    if (fields.isRegular) {
      fields.day = fields.when.day;
      fields.week = fields.when.week;
    } else {
      fields.dates = fields.when;
    }
    delete fields['when'];
    return fields;
  }

  @Column(DataType.VIRTUAL)
  dates: string[];

  @Column(DataType.VIRTUAL)
  day: Day;

  @Column(DataType.VIRTUAL)
  week: Week;

  @Column
  index: number;

  @Column
  type: TimetableEntryType;

  @Column
  isRegular: boolean;

  @ForeignKey(() => Subject)
  @Column
  subjectId: number;

  @ForeignKey(() => Cabinet)
  @Column
  cabinetId: number;

  @ForeignKey(() => Group)
  @Column
  groupId: number;

  @BelongsTo(() => Cabinet)
  cabinet: Cabinet;

  @BelongsTo(() => Subject)
  lesson: Subject;

  @BelongsToMany(() => Teacher, () => TeacherTimetable)
  teachers: Teacher[];

  @HasOne(() => RegularTimetable)
  regular: RegularTimetable;

  @HasMany(() => PatchTimetable)
  patches: PatchTimetable[];

  @BelongsTo(() => Group)
  group: Group;
}
