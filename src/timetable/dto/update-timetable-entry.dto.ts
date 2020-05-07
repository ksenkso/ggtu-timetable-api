import { Day, TimetableEntryType, Week } from '../../models/timetable-entry.model';

export class UpdateTimetableEntryDto {
    lessonId?: number;
    teacherIds?: number[];
    cabinetId?: number;
    groupId?: number;
    day?: Day;
    week?: Week;
    index?: number;
    type?: TimetableEntryType
}
