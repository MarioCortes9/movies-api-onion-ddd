import { Injectable, Inject } from '@nestjs/common';
import { MovieRepositoryPort } from '../ports/movie.repository';
import { Movie } from '../../domain/movie';


@Injectable()
export class ListMoviesUseCase {
    constructor(
        private readonly movieRepository: MovieRepositoryPort
    ) { }


    async execute(filters: { title?: string; genre?: string; watched?: boolean }): Promise<Movie[]> {
        return this.movieRepository.list(filters);
    }
}
