import { IsOptional } from 'class-validator';

export class UpdateSubjectDto {
  @IsOptional()
  name?: string;
}
