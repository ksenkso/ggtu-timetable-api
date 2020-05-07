import { BelongsToMany, Column, Model, Table } from 'sequelize-typescript';
import { TimetableEntry } from './timetable-entry.model';
import { TeacherTimetable } from './teacher-timetable.model';

@Table({ timestamps: false })
export class Teacher extends Model<Teacher> {
  @Column
  name: string;

  @BelongsToMany(() => TimetableEntry, () => TeacherTimetable)
  lessons: TimetableEntry;
}
