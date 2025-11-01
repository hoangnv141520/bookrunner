import { Module } from '@nestjs/common';
import { NovelLikeService } from './novel-like.service';
import { NovelLikeController } from './novel-like.controller';
import { novelLikeProvider } from 'src/provider/novellike.provider';
import { DatabaseModule } from 'src/database/database.module';
import { userProvider } from 'src/provider/users.provider';
import { novelProvider } from 'src/provider/novels.provider';

@Module({
  imports: [DatabaseModule],
  controllers: [NovelLikeController],
  providers: [
    ...novelLikeProvider,
    ...userProvider,
    ...novelProvider,
    NovelLikeService],
})
export class NovelLikeModule { }
