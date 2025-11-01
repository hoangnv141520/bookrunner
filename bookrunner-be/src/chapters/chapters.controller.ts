import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ChaptersService } from './chapters.service';
import { CreateChapterDto } from './dto/create-chapter.dto';
import { UpdateChapterDto } from './dto/update-chapter.dto';

@Controller('chapters')
export class ChaptersController {
  constructor(private readonly chaptersService: ChaptersService) { }

  @Post()
  create(@Body() createChapterDto: CreateChapterDto) {
    return this.chaptersService.create(createChapterDto);
  }

  @Get()
  findAll() {
    return this.chaptersService.findAll();
  }

  @Get('recent')
  recent() {
    return this.chaptersService.recent();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    const parsedId = Number(id);
    return this.chaptersService.findOne(parsedId);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateChapterDto: UpdateChapterDto) {
    return this.chaptersService.update(+id, updateChapterDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    const parsedId = Number(id);
    return this.chaptersService.remove(parsedId);
  }


}
