import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from 'sequelize-typescript';
import { TimetablePatch } from './patch.model';

@Table({
  tableName: 'patch_date',
  timestamps: false
})
export class PatchDate extends Model<PatchDate> {
  @Column(DataType.DATEONLY)
  date: string

  @ForeignKey(() => TimetablePatch)
  @Column
  patchId: number

  @BelongsTo(() => TimetablePatch)
  patch
}
