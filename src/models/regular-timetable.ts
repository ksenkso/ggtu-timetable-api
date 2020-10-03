import { BelongsTo, Column, ForeignKey, Model, Table } from 'sequelize-typescript';
import { Lesson } from './lesson.model';

export enum Week {
  Top,
  Bottom,
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
  tableName: 'RegularTimetable',
  timestamps: false,
})
export class RegularTimetable extends Model<RegularTimetable> {
  @Column
  day: Day;

  @Column
  week: Week;

  @ForeignKey(() => Lesson)
  @Column({ onDelete: 'CASCADE' })
  lessonId: number;

  @BelongsTo(() => Lesson)
  lesson: Lesson;

}
