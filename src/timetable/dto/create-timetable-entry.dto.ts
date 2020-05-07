import { Day, TimetableEntryType } from '../../models/timetable-entry.model';

export class CreateTimetableEntryDto {
    lessonId: number;
    teacherIds: number[];
    cabinetId: number;
    day: Day;
    index: number;
    type: TimetableEntryType;
}
