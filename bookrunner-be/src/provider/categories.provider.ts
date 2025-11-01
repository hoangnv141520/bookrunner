import { Category } from "src/categories/entities/category.entity";
import { DataSource } from "typeorm";

export const categoryProvider = [
    {
        provide: 'CATEGORY_REPOSITORY',
        useFactory: (dataSource: DataSource) => dataSource.getRepository(Category),
        inject: ['DATA_SOURCE'],
    }
];