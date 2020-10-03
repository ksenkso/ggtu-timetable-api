import { IsNumber, IsOptional } from 'class-validator';

export class UpdateGroupDto {
    @IsOptional()
    name?: string;

    @IsOptional()
    @IsNumber()
    entranceYear?: number;

    @IsOptional()
    @IsNumber()
    specializationId?: number;

    @IsOptional()
    @IsNumber()
    facultyId?: number;
}
