import { Column, ForeignKey, Model, Table } from 'sequelize-typescript';
import { Teacher } from './teacher.model';
import { TimetablePatch } from './patch.model';

/**
 * A relation similar to TeacherTimetable
 */
@Table({
  tableName: 'teacher_patch',
  timestamps: false,
})
export class TeacherPatch extends Model<TeacherPatch> {

  @ForeignKey(() => TimetablePatch)
  @Column
  timetablePatchId: number;

  @ForeignKey(() => Teacher)
  @Column
  teacherId: number;
}
