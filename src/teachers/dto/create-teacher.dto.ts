import { IsNotEmpty } from 'class-validator';

export class CreateTeacherDto {
    @IsNotEmpty()
    name: string;
}
