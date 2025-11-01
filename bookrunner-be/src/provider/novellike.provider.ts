import { NovelLike } from "src/novel-like/entities/novel-like.entity";
import { DataSource } from "typeorm";

export const novelLikeProvider = [
    {
        provide: 'NOVELLIKE_REPOSITORY',
        useFactory: (dataSource: DataSource) => dataSource.getRepository(NovelLike),
        inject: ['DATA_SOURCE'],
    }
];