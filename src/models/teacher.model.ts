import { BelongsToMany, Column, Model, Table } from 'sequelize-typescript';
import { TeacherTimetable } from './teacher-timetable.model';
import { Lesson } from './lesson.model';

@Table({ timestamps: false })
export class Teacher extends Model<Teacher> {
  @Column
  name: string;

  @BelongsToMany(() => Lesson, () => TeacherTimetable)
  lessons: Lesson[];
}
