import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { NovelLikeService } from './novel-like.service';
import { CreateNovelLikeDto } from './dto/create-novel-like.dto';
import { UpdateNovelLikeDto } from './dto/update-novel-like.dto';

@Controller('novel-like')
export class NovelLikeController {
  constructor(private readonly novelLikeService: NovelLikeService) {}

  @Post()
  create(@Body() createNovelLikeDto: CreateNovelLikeDto) {
    return this.novelLikeService.create(createNovelLikeDto);
  }

  @Get()
  findAll() {
    return this.novelLikeService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.novelLikeService.findOne(+id);
  }

  @Get('/novel/:id')
  findByNovel(@Param('id') id: string) {
    return this.novelLikeService.findByNovel(+id);
  }

  @Get('/user/:id')
  findByUser(@Param('id') id: string) {
    return this.novelLikeService.findByUser(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateNovelLikeDto: UpdateNovelLikeDto) {
    return this.novelLikeService.update(+id, updateNovelLikeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.novelLikeService.remove(+id);
  }
}
