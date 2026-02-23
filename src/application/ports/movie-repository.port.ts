import { Movie } from '../../domain/movie';


export interface MovieRepositoryPort {
    create(movie: Movie): Promise<void>;
    findById(id: string): Promise<Movie | null>;
    list(filters: { title?: string; genre?: string; watched?: boolean }): Promise<Movie[]>;
    update(movie: Movie): Promise<void>;
    delete(id: string): Promise<void>;
}
