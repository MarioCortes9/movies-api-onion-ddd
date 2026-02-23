import { MovieRepositoryPort } from '../ports/movie-repository.port';
import { Movie } from '../../domain/movie';


export class ListMoviesUseCase {
    constructor(private readonly movieRepository: MovieRepositoryPort) { }


    async execute(filters: { title?: string; genre?: string; watched?: boolean }): Promise<Movie[]> {
        return this.movieRepository.list(filters);
    }
}
