import { Column, ForeignKey, Model, Table } from 'sequelize-typescript';
import { Teacher } from './teacher.model';
import { Lesson } from './lesson.model';

@Table({
  tableName: 'teacher_timetable',
  timestamps: false,
})
export class TeacherTimetable extends Model<TeacherTimetable> {

  @ForeignKey(() => Lesson)
  @Column
  lessonId: number;

  @ForeignKey(() => Teacher)
  @Column
  teacherId: number;
}
