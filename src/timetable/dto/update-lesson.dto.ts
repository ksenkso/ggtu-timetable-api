import { Day, Week } from '../../models/regular-timetable';
import { TimetableEntryType } from '../../models/lesson.model';
import { IsOptional } from 'class-validator';

export class UpdateLessonDto {
  @IsOptional()
  subjectId?: number;
  @IsOptional()
  teacherIds?: number[];
  @IsOptional()
  cabinetId?: number;
  @IsOptional()
  day?: Day;
  @IsOptional()
  week?: Week;
  @IsOptional()
  index?: number;
  @IsOptional()
  type?: TimetableEntryType;
  @IsOptional()
  isRegular?: boolean;
}
