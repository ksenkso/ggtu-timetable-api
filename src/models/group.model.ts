import { Column, HasMany, Model, Table } from 'sequelize-typescript';
import { TimetableEntry } from './timetable-entry.model';

@Table({ timestamps: false })
export class Group extends Model<Group> {
  @Column
  name: string;

  @HasMany(() => TimetableEntry)
  entries: TimetableEntry[];
}
