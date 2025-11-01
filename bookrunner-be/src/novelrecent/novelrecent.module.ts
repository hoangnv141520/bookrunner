import { Module } from '@nestjs/common';
import { NovelrecentService } from './novelrecent.service';
import { NovelrecentController } from './novelrecent.controller';
import { DatabaseModule } from 'src/database/database.module';
import { novelrecentProvider } from 'src/provider/novelrecent.provider';
import { userProvider } from 'src/provider/users.provider';
import { novelProvider } from 'src/provider/novels.provider';

@Module({
  imports: [DatabaseModule],
  controllers: [NovelrecentController],
  providers: [
    ...novelrecentProvider,
    ...userProvider,
    ...novelProvider,
    NovelrecentService],
})
export class NovelrecentModule { }
