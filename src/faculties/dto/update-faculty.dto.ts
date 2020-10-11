import { IsOptional } from 'class-validator';

export class UpdateFacultyDto {
    @IsOptional()
    name?: string;
}
