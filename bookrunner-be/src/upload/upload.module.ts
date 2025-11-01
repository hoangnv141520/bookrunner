import { Module } from '@nestjs/common';
import { UploadController } from './upload.controller';
import { UploadService } from './upload.service';
import { UsersService } from 'src/users/users.service';
import { UsersModule } from 'src/users/users.module';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  imports: [UsersModule, DatabaseModule],
  controllers: [UploadController],
  providers: [UploadService],
})
export class UploadModule {}
