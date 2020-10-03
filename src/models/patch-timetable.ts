import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from 'sequelize-typescript';
import { Lesson } from './lesson.model';

@Table({
  tableName: 'patch_date',
  timestamps: false,
})
export class PatchTimetable extends Model<PatchTimetable> {
  @Column(DataType.DATEONLY)
  date: string;

  @ForeignKey(() => Lesson)
  @Column({ onDelete: 'CASCADE' })
  lessonId: number;

  @BelongsTo(() => Lesson)
  lesson: Lesson;

}
