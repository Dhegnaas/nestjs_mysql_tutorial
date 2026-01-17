import { IsString, IsNotEmpty, MinLength, MaxLength } from 'class-validator';

export class CreateCategoryDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(2, { message: 'Magacu waa inuu ka yara shaan 2 xaraf' })
  @MaxLength(50, { message: 'Magacu ma dheeraan karo 50 xaraf' })
  name: string;

  @IsString()
  description: string;
}
