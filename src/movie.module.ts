import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MovieOrmEntity } from './infrastructure/typeorm/movie.orm-entity';
import { TypeOrmMovieRepository } from './infrastructure/repositories/typeorm-movie.repository';
import { CreateMovieUseCase } from './application/usecases/create-movie.usecase';
import { ListMoviesUseCase } from './application/usecases/list-movies.usecase';
import { MovieController } from './interfaces/http/movie.controller';
import { MovieRepositoryPort } from './application/ports/movie.repository';

@Module({
    imports: [TypeOrmModule.forFeature([MovieOrmEntity])],
    controllers: [MovieController],
    providers: [
        CreateMovieUseCase,
        ListMoviesUseCase,
        {
            provide: MovieRepositoryPort,
            useClass: TypeOrmMovieRepository,
        },
    ],
    exports: [CreateMovieUseCase, ListMoviesUseCase],
})
export class MovieModule { }
