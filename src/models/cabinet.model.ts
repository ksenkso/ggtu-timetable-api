import { AllowNull, BelongsTo, Column, ForeignKey, Model, Table } from 'sequelize-typescript';
import { Building } from './building.model';

@Table
export class Cabinet extends Model<Cabinet> {
    @Column
    name: string;

    @Column
    number: string;

    @AllowNull
    @Column
    floor: number;

    @ForeignKey(() => Building)
    @Column
    buildingId: number;

    @BelongsTo(() => Building)
    building: Building
}
