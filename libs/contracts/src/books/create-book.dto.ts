import {
    IsNotEmpty,
    IsPositive,
    IsString,
  } from 'class-validator';
export class CreateBookDto {
    @IsString()
    @IsNotEmpty()
    title: string;
    
    @IsString()
    @IsNotEmpty()
    author: string;

    @IsPositive()
    @IsNotEmpty()
    rating: number;
}
