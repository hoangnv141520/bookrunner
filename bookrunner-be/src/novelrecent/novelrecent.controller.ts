import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { NovelrecentService } from './novelrecent.service';
import { CreateNovelrecentDto } from './dto/create-novelrecent.dto';
import { UpdateNovelrecentDto } from './dto/update-novelrecent.dto';

@Controller('novelrecent')
export class NovelrecentController {
  constructor(private readonly novelrecentService: NovelrecentService) {}

  @Post()
  create(@Body() createNovelrecentDto: CreateNovelrecentDto) {
    return this.novelrecentService.create(createNovelrecentDto);
  }

  @Get()
  findAll() {
    return this.novelrecentService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.novelrecentService.findOne(+id);
  }

  @Get('user/:id')
  findByUser(@Param('id') id: string) {
    return this.novelrecentService.findByUser(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateNovelrecentDto: UpdateNovelrecentDto) {
    return this.novelrecentService.update(+id, updateNovelrecentDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.novelrecentService.remove(+id);
  }
}
