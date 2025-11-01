import { Module } from '@nestjs/common';
import { NovelVoteService } from './novel-vote.service';
import { NovelVoteController } from './novel-vote.controller';
import { novelVoteProvider } from 'src/provider/novelvote.provider';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [NovelVoteController],
  providers: [
    ...novelVoteProvider,
    NovelVoteService],
})
export class NovelVoteModule {}
