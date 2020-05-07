import { BelongsTo, BelongsToMany, Column, ForeignKey, Model, Table } from 'sequelize-typescript';
import { Lesson } from './lesson.model';
import { Teacher } from './teacher.model';
import { Cabinet } from './cabinet.model';
import { TeacherTimetable } from './teacher-timetable.model';
export enum TimetableEntryType {
    Lecture,
    Practice,
    Lab,
}

export enum Day {
    Monday,
    Tuesday,
    Wednesday,
    Thursday,
    Friday,
    Saturday,
}
@Table({tableName: 'timetable_entry'})
export class TimetableEntry extends Model<TimetableEntry> {

    @Column
    day: Day;

    @Column
    index: number;

    @Column
    type: TimetableEntryType

    @ForeignKey(() => Lesson)
    @Column
    lessonId: number;

    @ForeignKey(() => Cabinet)
    @Column
    cabinetId: number;

    @BelongsTo(() => Lesson)
    lesson: Lesson;

    @BelongsToMany(() => Teacher, () => TeacherTimetable)
    teachers: Teacher[]
}
