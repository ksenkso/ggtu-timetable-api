import { IsOptional } from 'class-validator';

export class UpdateCabinetDto {
  @IsOptional()
  name?: string;
  @IsOptional()
  number?: number;
  @IsOptional()
  floor?: number;
  @IsOptional()
  buildingId?: number;
}
