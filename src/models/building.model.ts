import { Column, HasMany, Model, Table } from 'sequelize-typescript';
import { Cabinet } from './cabinet.model';

@Table
export class Building extends Model<Building> {
    @Column
    name: string;

    @HasMany(() => Cabinet)
    cabinets: Cabinet[];
}
