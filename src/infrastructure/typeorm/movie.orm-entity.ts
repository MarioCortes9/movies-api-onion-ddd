import { Entity, PrimaryColumn, Column, CreateDateColumn } from 'typeorm';
import { MovieGenre } from '../../domain/movie';


@Entity('movies')
export class MovieOrmEntity {
    @PrimaryColumn('uuid')
    id: string;


    @Column({ length: 120 })
    title: string;


    @Column({ type: 'text', nullable: true })
    description: string;


    @Column({ type: 'int' })
    releaseYear: number;


    @Column({ type: 'enum', enum: MovieGenre })
    genre: MovieGenre;


    @Column({ default: false })
    watched: boolean;


    @Column({ type: 'int', nullable: true })
    rating: number;


    @CreateDateColumn()
    createdAt: Date;
}
