import { Column, Model, Table } from 'sequelize-typescript';

@Table({ timestamps: false })
export class Lesson extends Model<Lesson> {
  @Column
  name: string;
}
