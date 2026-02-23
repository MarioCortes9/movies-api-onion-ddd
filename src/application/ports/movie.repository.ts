import { Movie } from '../../domain/movie';


export abstract class MovieRepositoryPort {
    abstract create(movie: Movie): Promise<void>;
    abstract findById(id: string): Promise<Movie | null>;
    abstract list(filters: { title?: string; genre?: string; watched?: boolean }): Promise<Movie[]>;
    abstract update(movie: Movie): Promise<void>;
    abstract delete(id: string): Promise<void>;
}
