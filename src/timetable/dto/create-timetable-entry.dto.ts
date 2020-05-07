import { Day, TimetableEntryType, Week } from '../../models/timetable-entry.model';

export class CreateTimetableEntryDto {
    lessonId: number;
    teacherIds: number[];
    cabinetId: number;
    groupId: number;
    day: Day;
    week: Week;
    index: number;
    type: TimetableEntryType;
}
