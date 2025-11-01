import { Author } from "src/authors/entities/author.entity";
import { DataSource } from "typeorm";

export const authorProvider = [
    {
        provide: 'AUTHOR_REPOSITORY',
        useFactory: (dataSource: DataSource) => dataSource.getRepository(Author),
        inject: ['DATA_SOURCE'],
    }
];