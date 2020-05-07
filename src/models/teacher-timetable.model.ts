import { Column, ForeignKey, Model, Table } from 'sequelize-typescript';
import { Teacher } from './teacher.model';
import { TimetableEntry } from './timetable-entry.model';

@Table({tableName: 'teacher_timetable'})
export class TeacherTimetable extends Model<TeacherTimetable> {

    @ForeignKey(() => TimetableEntry)
    @Column
    timetableEntryId: number;

    @ForeignKey(() => Teacher)
    @Column
    teacherId: number;
}
