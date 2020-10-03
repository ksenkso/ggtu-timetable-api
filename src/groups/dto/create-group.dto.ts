import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateGroupDto {
    @IsNotEmpty()
    name: string;

    @IsNumber()
    entranceYear: number;

    @IsNotEmpty()
    @IsNumber()
    specializationId: number;

    @IsNotEmpty()
    @IsNumber()
    facultyId: number;
}
