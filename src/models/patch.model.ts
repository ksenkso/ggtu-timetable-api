import { BelongsTo, BelongsToMany, Column, DataType, ForeignKey, HasMany, Model, Table } from 'sequelize-typescript';
import { Lesson } from './lesson.model';
import { Cabinet } from './cabinet.model';
import { Group } from './group.model';
import { Teacher } from './teacher.model';
import { TimetableEntryType } from './timetable-entry.model';
import { TeacherPatch } from './teacher-patch.model';
import { PatchDate } from './patch-date';

/**
 * This entity is similar to TimetableEntry but represents a patched entry,
 * maybe i should rename it
 */
@Table({
  tableName: 'timetable_patch',
  timestamps: false,
})
export class TimetablePatch extends Model<TimetablePatch> {

  @Column(DataType.VIRTUAL)
  get dates(): string[] {
    return this.patchDates ? this.patchDates.map(date => date.date) : [];
  }

  @HasMany(() => PatchDate)
  patchDates: PatchDate[];

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
