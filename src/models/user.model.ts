import { BeforeSave, BelongsTo, BelongsToMany, Column, DataType, ForeignKey, Model, Table } from 'sequelize-typescript';
import * as bcrypt from 'bcrypt';
import { Role } from './role.model';
import { UserRole } from './user-role.model';
import { Faculty } from './faculty.model';

@Table({
  timestamps: false
})
export class User extends Model<User> {
  static async hashPassword(password: string) {
    if (!password) {
      throw new Error('Password shouldn\'t be an empty string.');
    } else {
      const salt = await bcrypt.genSalt(10);
      return await bcrypt.hash(password, salt);
    }
  }

  @Column
  username: string;

  @Column
  password: string;

  @Column(DataType.VIRTUAL)
  get roles(): string[] {
    const roles = this.getDataValue('userRoles');
    return roles ? roles.map(role => role.name) : [];
  }

  @ForeignKey(() => Faculty)
  @Column
  facultyId: number;

  @BelongsTo(() => Faculty)
  faculty: Faculty;

  @BelongsToMany(() => Role, () => UserRole)
  userRoles: Role[];

  @BeforeSave
  static async updatePassword(model: User) {
    if (model.changed('password')) {
      model.password = await User.hashPassword(model.password);
    }
  }

  async comparePassword(pw) {
    try {
      return await bcrypt.compare(pw, this.password);
    } catch (e) {
      console.error(JSON.stringify(e));
      return false;
    }
  }

  withoutPassword() {
    const json = this.toJSON() as any;
    delete json.password;
    return json;
  }

  toJSON(): object {
    const fields: any = super.toJSON();
    delete fields.password;
    if (fields.userRoles) {
      delete fields.userRoles;
    }
    return fields;
  }
}
