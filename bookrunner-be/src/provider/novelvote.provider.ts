import { NovelVote } from "src/novel-vote/entities/novel-vote.entity";
import { DataSource } from "typeorm";

export const novelVoteProvider = [
    {
        provide: 'NOVELVOTE_REPOSITORY',
        useFactory: (dataSource: DataSource) => dataSource.getRepository(NovelVote),
        inject: ['DATA_SOURCE'],
    }
];