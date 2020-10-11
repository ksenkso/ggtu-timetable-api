import { IsOptional } from 'class-validator';

export class UpdateTeacherDto {
  @IsOptional()
  name?: string;
}
