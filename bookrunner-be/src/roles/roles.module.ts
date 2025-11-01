import { Module } from '@nestjs/common';
import { RolesService } from './roles.service';
import { RolesController } from './roles.controller';
import { DatabaseModule } from 'src/database/database.module';
import { roleProvider } from 'src/provider/roles.provider';

@Module({
  imports: [DatabaseModule],
  controllers: [RolesController],
  providers: [
    ...roleProvider,
    RolesService
  ],
})
export class RolesModule {}
