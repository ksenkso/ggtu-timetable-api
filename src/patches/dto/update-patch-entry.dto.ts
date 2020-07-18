import { TimetableEntryType, Week } from '../../models/timetable-entry.model';

export class UpdatePatchEntryDto {
    lessonId?: number;
    teacherIds?: number[];
    cabinetId?: number;
    groupId?: number;
    date?: Date;
    week?: Week;
    index?: number;
    type?: TimetableEntryType
}
