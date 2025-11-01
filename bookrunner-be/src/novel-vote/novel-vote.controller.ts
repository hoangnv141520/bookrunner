import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { NovelVoteService } from './novel-vote.service';
import { CreateNovelVoteDto } from './dto/create-novel-vote.dto';
import { UpdateNovelVoteDto } from './dto/update-novel-vote.dto';

@Controller('novel-vote')
export class NovelVoteController {
  constructor(private readonly novelVoteService: NovelVoteService) {}

  @Post()
  create(@Body() createNovelVoteDto: CreateNovelVoteDto) {
    return this.novelVoteService.create(createNovelVoteDto);
  }

  @Get()
  findAll() {
    return this.novelVoteService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.novelVoteService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateNovelVoteDto: UpdateNovelVoteDto) {
    return this.novelVoteService.update(+id, updateNovelVoteDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.novelVoteService.remove(+id);
  }
}
