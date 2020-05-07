import { BelongsTo, BelongsToMany, Column, ForeignKey, Model, Table } from 'sequelize-typescript';
import { Lesson } from './lesson.model';
import { Teacher } from './teacher.model';
import { Cabinet } from './cabinet.model';
import { TeacherTimetable } from './teacher-timetable.model';
import { Group } from './group.model';

export enum Week {
  Top,
  Bottom,
}

export enum TimetableEntryType {
  Lecture,
  Practice,
  Lab,
}

export enum Day {
  Monday,
  Tuesday,
  Wednesday,
  Thursday,
  Friday,
  Saturday,
}

@Table({
  tableName: 'timetable_entry',
  timestamps: false,
})
export class TimetableEntry extends Model<TimetableEntry> {

  @Column
  day: Day;

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

  @BelongsToMany(() => Teacher, () => TeacherTimetable)
  teachers: Teacher[];

  @BelongsTo(() => Group)
  group: Group;
}
