import { Artist } from "src/artists/entities/artist.entity";
import { DataSource } from "typeorm";

export const artistProvider = [
    {
        provide: 'ARTIST_REPOSITORY',
        useFactory: (dataSource: DataSource) => dataSource.getRepository(Artist),
        inject: ['DATA_SOURCE'],
    }
];