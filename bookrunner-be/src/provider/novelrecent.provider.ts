import { Novelrecent } from "src/novelrecent/entities/novelrecent.entity";
import { DataSource } from "typeorm";

export const novelrecentProvider = [
    {
        provide: 'NOVELRECENT_REPOSITORY',
        useFactory: (dataSource: DataSource) => dataSource.getRepository(Novelrecent),
        inject: ['DATA_SOURCE'],
    }
];