import { Column, ForeignKey, Model, Table } from 'sequelize-typescript';
import { User } from './user.model';
import { Role } from './role.model';

@Table({
  tableName: 'user_role',
  timestamps: false,
})
export class UserRole extends Model<UserRole> {

  @ForeignKey(() => User)
  @Column
  userId: number;

  @ForeignKey(() => Role)
  @Column
  roleId: number;
}
