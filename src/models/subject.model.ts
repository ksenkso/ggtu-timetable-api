import { Column, Model, Table } from 'sequelize-typescript';

@Table({ timestamps: false })
export class Subject extends Model<Subject> {
  @Column
  name: string;
}
