import { IsOptional } from 'class-validator';

export class UpdateBuildingDto {
    @IsOptional()
    name?: string;
}
