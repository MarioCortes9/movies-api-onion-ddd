import { Repository } from 'typeorm';
import { MovieRepositoryPort } from '../../application/ports/movie.repository';
import { Movie, MovieGenre } from '../../domain/movie';
import { MovieOrmEntity } from '../typeorm/movie.orm-entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable, Inject } from '@nestjs/common';

@Injectable()
export class TypeOrmMovieRepository implements MovieRepositoryPort {
    constructor(
        @InjectRepository(MovieOrmEntity)
        private readonly repository: Repository<MovieOrmEntity>,
    ) { }

    async create(movie: Movie): Promise<void> {
        const ormEntity = this.toOrm(movie);
        await this.repository.save(ormEntity);
    }

    async findById(id: string): Promise<Movie | null> {
        const ormEntity = await this.repository.findOneBy({ id });
        return ormEntity ? this.toDomain(ormEntity) : null;
    }

    async list(filters: { title?: string; genre?: string; watched?: boolean }): Promise<Movie[]> {
        const query = this.repository.createQueryBuilder('movie');

        if (filters.title) {
            query.andWhere('movie.title ILIKE :title', { title: `%${filters.title}%` });
        }

        if (filters.genre) {
            query.andWhere('movie.genre = :genre', { genre: filters.genre });
        }

        if (filters.watched !== undefined) {
            query.andWhere('movie.watched = :watched', { watched: filters.watched });
        }

        const ormEntities = await query.getMany();
        return ormEntities.map((entity) => this.toDomain(entity));
    }

    async update(movie: Movie): Promise<void> {
        const ormEntity = this.toOrm(movie);
        await this.repository.save(ormEntity);
    }

    async delete(id: string): Promise<void> {
        await this.repository.delete(id);
    }

    private toDomain(ormEntity: MovieOrmEntity): Movie {
        return new Movie({
            id: ormEntity.id,
            title: ormEntity.title,
            description: ormEntity.description ?? undefined,
            releaseYear: ormEntity.releaseYear,
            genre: ormEntity.genre,
            watched: ormEntity.watched,
            rating: ormEntity.rating ?? undefined,
        });
    }

    private toOrm(movie: Movie): MovieOrmEntity {
        const props = movie.getProps();
        const ormEntity = new MovieOrmEntity();
        ormEntity.id = props.id;
        ormEntity.title = props.title;
        ormEntity.description = props.description ?? null;
        ormEntity.releaseYear = props.releaseYear;
        ormEntity.genre = props.genre;
        ormEntity.watched = props.watched;
        ormEntity.rating = props.rating ?? null;
        return ormEntity;
    }
}
