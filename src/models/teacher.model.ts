import { Column, Model, Table } from 'sequelize-typescript';

@Table
export class Teacher extends Model<Teacher> {
    @Column
    name: string;

}
