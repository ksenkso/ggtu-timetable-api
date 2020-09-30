import { TimetableEntryType } from '../../models/timetable-entry.model';

export class CreatePatchEntryDto {
    lessonId: number;
    teacherIds: number[];
    cabinetId: number;
    groupId: number;
    dates: string[];
    index: number;
    type: TimetableEntryType;
}
