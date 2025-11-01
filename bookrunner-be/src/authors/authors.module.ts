import { Module } from '@nestjs/common';
import { AuthorsService } from './authors.service';
import { AuthorsController } from './authors.controller';
import { DatabaseModule } from 'src/database/database.module';
import { authorProvider } from 'src/provider/authors.provider';

@Module({
  imports: [DatabaseModule],
  controllers: [AuthorsController],
  providers: [
    ...authorProvider,
    AuthorsService],
})
export class AuthorsModule {}
