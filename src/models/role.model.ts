import { BelongsToMany, Column, Model, Table } from 'sequelize-typescript';
import { User } from './user.model';
import { UserRole } from './user-role.model';

@Table
export class Role extends Model<Role> {
    @Column
    name: string

    @BelongsToMany(() => User, () => UserRole)
    users: User[]
}
