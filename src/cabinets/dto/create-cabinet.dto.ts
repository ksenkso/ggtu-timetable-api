import { IsNotEmpty } from 'class-validator';

export class CreateCabinetDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  number: number;

  @IsNotEmpty()
  floor: number;

  @IsNotEmpty()
  buildingId: number;
}
