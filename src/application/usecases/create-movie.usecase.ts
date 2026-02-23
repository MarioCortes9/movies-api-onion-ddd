import { Movie, MovieGenre } from '../../domain/movie';
import { MovieRepositoryPort } from '../ports/movie-repository.port';
import { v4 as uuidv4 } from 'uuid';


export interface CreateMovieCommand {
    title: string;
    description?: string;
    releaseYear: number;
    genre: MovieGenre;
    rating?: number;
}


export class CreateMovieUseCase {
    constructor(private readonly movieRepository: MovieRepositoryPort) { }


    async execute(command: CreateMovieCommand): Promise<string> {
        const movie = Movie.create({
            id: uuidv4(),
            ...command,
            watched: false,
        });


        await this.movieRepository.create(movie);
        return movie.getProps().id;
    }
}
