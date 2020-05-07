import { Column, Model, Table } from 'sequelize-typescript';

@Table
export class Lesson extends Model<Lesson> {
    @Column
    name: string;
}
