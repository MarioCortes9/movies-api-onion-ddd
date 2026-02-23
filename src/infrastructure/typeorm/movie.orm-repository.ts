import { Repository, ILike } from 'typeorm';
import { MovieRepositoryPort } from '../../application/ports/movie.repository';
import { Movie, MovieGenre } from '../../domain/movie';
import { MovieOrmEntity } from './movie.orm-entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';


@Injectable()
export class MovieTypeOrmRepository implements MovieRepositoryPort {
    constructor(
        @InjectRepository(MovieOrmEntity)
        private readonly repository: Repository<MovieOrmEntity>
    ) { }


    async create(movie: Movie): Promise<void> {
        const props = movie.getProps();
        const ormEntity = this.repository.create({
            id: props.id,
            title: props.title,
            description: props.description,
            releaseYear: props.releaseYear,
            genre: props.genre,
            watched: props.watched,
            rating: props.rating,
        });
        await this.repository.save(ormEntity);
    }


    async findById(id: string): Promise<Movie | null> {
        const entity = await this.repository.findOneBy({ id });
        if (!entity) return null;
        return this.toDomain(entity);
    }


    async list(filters: { title?: string; genre?: string; watched?: boolean }): Promise<Movie[]> {
        const where: any = {};
        if (filters.title) where.title = ILike(`%${filters.title}%`);
        if (filters.genre) where.genre = filters.genre;
        if (filters.watched !== undefined) where.watched = filters.watched;


        const entities = await this.repository.find({ where });
        return entities.map((e) => this.toDomain(e));
    }


    async update(movie: Movie): Promise<void> {
        const props = movie.getProps();
        await this.repository.save({
            id: props.id,
            title: props.title,
            description: props.description,
            releaseYear: props.releaseYear,
            genre: props.genre,
            watched: props.watched,
            rating: props.rating,
        });
    }


    async delete(id: string): Promise<void> {
        await this.repository.delete(id);
    }


    private toDomain(entity: MovieOrmEntity): Movie {
        return Movie.create({
            id: entity.id,
            title: entity.title,
            description: entity.description,
            releaseYear: entity.releaseYear,
            genre: entity.genre as MovieGenre,
            watched: entity.watched,
            rating: entity.rating,
        });
    }
}
