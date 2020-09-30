import { TimetableEntryType } from '../../models/timetable-entry.model';

export class UpdatePatchEntryDto {
    lessonId?: number;
    teacherIds?: number[];
    cabinetId?: number;
    groupId?: number;
    index?: number;
    type?: TimetableEntryType;
    dates: string[];
}
