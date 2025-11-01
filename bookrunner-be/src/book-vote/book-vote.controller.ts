import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { BookVoteService } from './book-vote.service';
import { CreateBookVoteDto } from './dto/create-book-vote.dto';
import { UpdateBookVoteDto } from './dto/update-book-vote.dto';

@Controller('book-vote')
export class BookVoteController {
  constructor(private readonly bookVoteService: BookVoteService) {}

  @Post()
  create(@Body() createBookVoteDto: CreateBookVoteDto) {
    return this.bookVoteService.create(createBookVoteDto);
  }

  @Get()
  findAll() {
    return this.bookVoteService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.bookVoteService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBookVoteDto: UpdateBookVoteDto) {
    return this.bookVoteService.update(+id, updateBookVoteDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.bookVoteService.remove(+id);
  }
}
