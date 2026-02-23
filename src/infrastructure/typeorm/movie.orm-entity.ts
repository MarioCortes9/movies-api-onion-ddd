import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('movies')
export class MovieOrmEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    title: string;

    @Column()
    description: string;

    @Column({ name: 'release_date', type: 'timestamp', nullable: true })
    releaseDate: Date;
}
