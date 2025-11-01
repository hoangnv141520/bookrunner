import { Chapter } from "src/chapters/entities/chapter.entity";
import { DataSource } from "typeorm";

export const chapterProvider = [
    {
        provide: 'CHAPTER_REPOSITORY',
        useFactory: (dataSource: DataSource) => dataSource.getRepository(Chapter),
        inject: ['DATA_SOURCE'],
    }
];