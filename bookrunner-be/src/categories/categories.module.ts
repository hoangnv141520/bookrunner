import { Module } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CategoriesController } from './categories.controller';
import { DatabaseModule } from 'src/database/database.module';
import { categoryProvider } from 'src/provider/categories.provider';
import { bookProvider } from 'src/provider/books.provider';

@Module({
  imports: [DatabaseModule],
  controllers: [CategoriesController],
  providers: [
    ...bookProvider,
    ...categoryProvider,
    CategoriesService],
})
export class CategoriesModule {}
