import { Module } from '@nestjs/common';
import { ChaptersService } from './chapters.service';
import { ChaptersController } from './chapters.controller';
import { DatabaseModule } from 'src/database/database.module';
import { chapterProvider } from 'src/provider/chapters.provider';

@Module({
  imports: [DatabaseModule],
  controllers: [ChaptersController],
  providers: [
    ...chapterProvider,
    ChaptersService],
})
export class ChaptersModule {}
