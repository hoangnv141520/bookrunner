import { Module } from '@nestjs/common';
import { BookVoteService } from './book-vote.service';
import { BookVoteController } from './book-vote.controller';
import { DatabaseModule } from 'src/database/database.module';
import { bookVoteProvider } from 'src/provider/bookvote.provider';

@Module({
  imports: [DatabaseModule],
  controllers: [BookVoteController],
  providers: [
    ...bookVoteProvider,
    BookVoteService],
})
export class BookVoteModule {}
