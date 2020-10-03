import { Column, Model, Table } from 'sequelize-typescript';

@Table({
  timestamps: false,
})
export class Faculty extends Model<Faculty> {
  @Column({ allowNull: false })
  name: string;
}
