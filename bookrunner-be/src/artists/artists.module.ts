import { Module } from '@nestjs/common';
import { ArtistsService } from './artists.service';
import { ArtistsController } from './artists.controller';
import { DatabaseModule } from 'src/database/database.module';
import { artistProvider } from 'src/provider/artists.provider';

@Module({
  imports: [DatabaseModule],
  controllers: [ArtistsController],
  providers: [
    ...artistProvider,
    ArtistsService],
})
export class ArtistsModule {}
