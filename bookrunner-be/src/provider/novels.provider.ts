import { Novel } from "src/novels/entities/novel.entity";
import { DataSource } from "typeorm";

export const novelProvider = [
    {
        provide: 'NOVEL_REPOSITORY',
        useFactory: (dataSource: DataSource) => dataSource.getRepository(Novel),
        inject: ['DATA_SOURCE'],
    }
];