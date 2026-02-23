import { Controller, Post, Get, Body, Query } from '@nestjs/common';
import { CreateMovieUseCase, CreateMovieCommand } from '../../application/usecases/create-movie.usecase';
import { ListMoviesUseCase } from '../../application/usecases/list-movies.usecase';
import { CreateMovieDto } from './dto/create-movie.dto';

@Controller('movies')
export class MovieController {
    constructor(
        private readonly createMovieUseCase: CreateMovieUseCase,
        private readonly listMoviesUseCase: ListMoviesUseCase,
    ) { }

    @Post()
    async create(@Body() createMovieDto: CreateMovieDto) {
        const command: CreateMovieCommand = {
            ...createMovieDto,
        };
        const id = await this.createMovieUseCase.execute(command);
        return { id };
    }

    @Get()
    async list(
        @Query('title') title?: string,
        @Query('genre') genre?: string,
        @Query('watched') watched?: string,
    ) {
        const filters = {
            title,
            genre,
            watched: watched !== undefined ? watched === 'true' : undefined,
        };
        const movies = await this.listMoviesUseCase.execute(filters);
        return movies.map((movie) => movie.getProps());
    }
}
