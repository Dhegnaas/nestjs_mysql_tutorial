import { IsString, IsNotEmpty, IsNumber, MinLength } from 'class-validator';

export class CreateBookDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  title: string;

  @IsString()
  @IsNotEmpty()
  author: string;

  @IsNumber()
  price: number;
}
