import { TimetableEntryType } from '../../models/lesson.model';
import { ArrayMinSize, IsArray, IsDateString, IsIn, IsNotEmpty, Max, Min } from 'class-validator';

export class CreatePatchDto {
  @IsNotEmpty()
  subjectId: number;

  @IsNotEmpty()
  @IsArray()
  teacherIds: number[];

  @IsNotEmpty()
  cabinetId: number;

  @IsNotEmpty()
  groupId: number;

  @Min(0)
  @Max(6)
  index: number;

  @IsArray()
  @ArrayMinSize(1)
  @IsDateString({ each: true })
  dates: string[];

  @IsIn(Object.keys(TimetableEntryType).map(key => TimetableEntryType[key]))
  type: TimetableEntryType;

  isRegular: boolean;
}
