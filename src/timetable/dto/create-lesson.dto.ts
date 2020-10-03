import { Day, Week } from '../../models/regular-timetable';
import { TimetableEntryType } from '../../models/lesson.model';
import { IsArray, IsIn, IsNotEmpty, Max, Min } from 'class-validator';

export class CreateLessonDto {
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
  day: Day;

  @IsIn([Week.Top, Week.Bottom])
  week: Week;

  @Min(0)
  @Max(6)
  index: number;

  @IsIn(Object.keys(TimetableEntryType).map(key => TimetableEntryType[key]))
  type: TimetableEntryType;

  isRegular: boolean;
}
