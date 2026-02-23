import { DataSource } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { config } from 'dotenv';
import { MovieOrmEntity } from '../typeorm/movie.orm-entity';


config();


const configService = new ConfigService();


export default new DataSource({
    type: 'postgres',
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT || '5432'),
    username: process.env.DB_USER || 'postgres',
    password: process.env.DB_PASS || 'postgres',
    database: process.env.DB_NAME || 'movie_db',
    entities: [MovieOrmEntity],
    migrations: ['src/infrastructure/db/migrations/*.ts'],
    synchronize: false,
});
