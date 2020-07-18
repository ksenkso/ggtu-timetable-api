import { TimetableEntryType, Week } from '../../models/timetable-entry.model';

export class CreatePatchEntryDto {
    lessonId: number;
    teacherIds: number[];
    cabinetId: number;
    groupId: number;
    date: Date;
    week: Week;
    index: number;
    type: TimetableEntryType;
}
