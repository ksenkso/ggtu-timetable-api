import { BelongsTo, Column, DataType, ForeignKey, HasMany, Model, Table } from 'sequelize-typescript';
import { Faculty } from './faculty.model';
import { Specialization } from './specialization.model';
import { Lesson } from './lesson.model';

@Table({ timestamps: false })
export class Group extends Model<Group> {
  @Column
  name: string;

  @Column(DataType.MEDIUMINT)
  entranceYear: number;

  @ForeignKey(() => Specialization)
  @Column
  specializationId: number;

  @BelongsTo(() => Specialization)
  specialization: Specialization;

  @ForeignKey(() => Faculty)
  @Column
  facultyId: number;

  @BelongsTo(() => Faculty)
  faculty: Faculty;

  @HasMany(() => Lesson)
  lessons: Lesson[];
}
