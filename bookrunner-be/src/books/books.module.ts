import { Module } from '@nestjs/common';
import { BooksService } from './books.service';
import { BooksController } from './books.controller';
import { DatabaseModule } from 'src/database/database.module';
import { bookProvider } from 'src/provider/books.provider';
import { authorProvider } from 'src/provider/authors.provider';
import { categoryProvider } from 'src/provider/categories.provider';

@Module({
  imports: [DatabaseModule],
  controllers: [BooksController],
  providers: [
    ...bookProvider,
    ...authorProvider,
    ...categoryProvider,
    BooksService],
})
export class BooksModule { }
