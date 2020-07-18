import { BelongsTo, BelongsToMany, Column, DataType, ForeignKey, Model, Table } from 'sequelize-typescript';
import { Lesson } from './lesson.model';
import { Cabinet } from './cabinet.model';
import { Group } from './group.model';
import { Teacher } from './teacher.model';
import { TimetableEntryType, Week } from './timetable-entry.model';
import { TeacherPatch } from './teacher-patch.model';

/**
 * This entity is similar to TimetableEntry but represents a patched entry,
 * maybe i should rename it
 */
@Table({
  tableName: 'timetable_patch',
  timestamps: false,
})
export class TimetablePatch extends Model<TimetablePatch> {

  @Column(DataType.DATEONLY)
  get date(): string {
    const date = this.getDataValue('date');
    return new Date(date).toLocaleDateString('ru-RU');
  }

  /**
   *
   * @param value should be a string like `dd.mm.yyyy`
   */
  set date(value: string) {
    const [day, month, year] = value.split('.');
    const date = new Date();
    date.setFullYear(+year);
    date.setMonth(+month-1);
    date.setDate(+day);
    this.setDataValue('date', date.toLocaleDateString('en-US'));
  }

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
