import { TimetableEntryType } from '../../models/lesson.model';
import { ArrayMinSize, IsArray, IsDateString, IsIn, IsOptional, Max, Min } from 'class-validator';

export class UpdatePatchDto {

    @IsOptional()
    subjectId?: number;

    @IsOptional()
    @IsArray()
    teacherIds?: number[];

    @IsOptional()
    cabinetId?: number;


    @IsOptional()
    @IsArray()
    @ArrayMinSize(1)
    @IsDateString({ each: true })
    dates: string[];

    @IsOptional()
    @Min(0)
    @Max(6)
    index?: number;

    @IsOptional()
    @IsIn(Object.keys(TimetableEntryType).map(key => TimetableEntryType[key]))
    type?: TimetableEntryType;
}
