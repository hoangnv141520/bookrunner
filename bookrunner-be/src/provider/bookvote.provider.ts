import { BookVote } from "src/book-vote/entities/book-vote.entity";
import { DataSource } from "typeorm";

export const bookVoteProvider = [
    {
        provide: 'BOOKVOTE_REPOSITORY',
        useFactory: (dataSource: DataSource) => dataSource.getRepository(BookVote),
        inject: ['DATA_SOURCE'],
    }
];