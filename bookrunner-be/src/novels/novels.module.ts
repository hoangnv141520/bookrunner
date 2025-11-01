import { Module } from '@nestjs/common';
import { NovelsService } from './novels.service';
import { NovelsController } from './novels.controller';
import { DatabaseModule } from 'src/database/database.module';
import { novelProvider } from 'src/provider/novels.provider';

@Module({
  imports: [DatabaseModule],
  controllers: [NovelsController],
  providers: [
    ...novelProvider,
    NovelsService],
})
export class NovelsModule {}
