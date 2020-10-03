import { TimetableEntryType } from '../../models/lesson.model';
import { IsArray, IsIn, IsOptional, Max, Min } from 'class-validator';
import { Day, Week } from '../../models/regular-timetable';

export class UpdatePatchDto {

    @IsOptional()
    subjectId?: number;

    @IsOptional()
    @IsArray()
    teacherIds?: number[];

    @IsOptional()
    cabinetId?: number;

    @IsOptional()
    groupId?: number;

    @IsOptional()
    @Min(0)
    @Max(6)
    day?: Day;

    @IsOptional()
    @IsIn([Week.Top, Week.Bottom])
    week?: Week;

    @IsOptional()
    @Min(0)
    @Max(6)
    index?: number;

    @IsOptional()
    @IsIn(Object.keys(TimetableEntryType).map(key => TimetableEntryType[key]))
    type?: TimetableEntryType;
}
