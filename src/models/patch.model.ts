import { BelongsTo, BelongsToMany, Column, DataType, ForeignKey, Model, Sequelize, Table } from 'sequelize-typescript';
import { Lesson } from './lesson.model';
import { Cabinet } from './cabinet.model';
import { Group } from './group.model';
import { Teacher } from './teacher.model';
import { TeacherTimetable } from './teacher-timetable.model';
import { TimetableEntryType, Week } from './timetable-entry.model';
import { TeacherPatch } from './teacher-patch.model';

@Table({
  tableName: 'timetable_patch',
  timestamps: false,
})
export class TimetablePatch extends Model<TimetablePatch> {

  @Column(DataType.DATEONLY)
  date: Date

  @Column
  week: Week;

  @Column
  index: number;

  @Column
  type: TimetableEntryType;

  @ForeignKey(() => Lesson)
  @Column
  lessonId: number;

  @ForeignKey(() => Cabinet)
  @Column
  cabinetId: number;

  @ForeignKey(() => Group)
  @Column
  groupId: number;

  @BelongsTo(() => Cabinet)
  cabinet: Cabinet;

  @BelongsTo(() => Lesson)
  lesson: Lesson;

  @BelongsToMany(() => Teacher, () => TeacherPatch)
  teachers: Teacher[];

  @BelongsTo(() => Group)
  group: Group;
}
