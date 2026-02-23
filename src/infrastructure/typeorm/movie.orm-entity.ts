import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { MovieGenre } from '../../domain/movie';

@Entity('movies')
export class MovieOrmEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ length: 120 })
    title: string;

    @Column({ type: 'text', nullable: true })
    description: string | null;

    @Column({ name: 'release_year' })
    releaseYear: number;

    @Column({
        type: 'enum',
        enum: MovieGenre,
    })
    genre: MovieGenre;

    @Column({ default: false })
    watched: boolean;

    @Column({ type: 'int', nullable: true })
    rating: number | null;
}
