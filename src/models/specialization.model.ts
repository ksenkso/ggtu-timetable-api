import { Column, Model, Table } from 'sequelize-typescript';

@Table({
  timestamps: false,
})
export class Specialization extends Model<Specialization> {
  @Column
  name: string;

  @Column
  code: string;
}
