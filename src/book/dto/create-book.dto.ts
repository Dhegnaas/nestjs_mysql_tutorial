import { IsString, IsNotEmpty, IsNumber, MinLength, IsOptional } from 'class-validator';

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

  @IsNumber()
  @IsOptional() // Hadii aadan rarin Category mar walba, ka tag optional
  categoryId: number; 
}
