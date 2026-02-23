import { IsString, IsInt, IsEnum, IsOptional, Min, Max, Length } from 'class-validator';
import { MovieGenre } from '../../../domain/movie';

export class CreateMovieDto {
    @IsString()
    @Length(2, 120)
    title: string;

    @IsString()
    @IsOptional()
    description?: string;

    @IsInt()
    @Min(1888)
    @Max(2100)
    releaseYear: number;

    @IsEnum(MovieGenre)
    genre: MovieGenre;

    @IsInt()
    @Min(1)
    @Max(5)
    @IsOptional()
    rating?: number;
}
