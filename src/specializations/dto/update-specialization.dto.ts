import { IsOptional } from 'class-validator';

export class UpdateSpecializationDto {
  @IsOptional()
  name?: string;
  @IsOptional()
  code?: string;
}
