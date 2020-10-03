import { Day, Week } from '../../models/regular-timetable';
import { TimetableEntryType } from '../../models/lesson.model';

export class UpdateLessonDto {
  lessonId?: number;
  teacherIds?: number[];
  cabinetId?: number;
  groupId?: number;
  day?: Day;
  week?: Week;
  index?: number;
  type?: TimetableEntryType;
  isRegular?: boolean;
}
