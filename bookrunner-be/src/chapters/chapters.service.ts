import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateChapterDto } from './dto/create-chapter.dto';
import { UpdateChapterDto } from './dto/update-chapter.dto';
import { Repository } from 'typeorm';
import { Chapter } from './entities/chapter.entity';

@Injectable()
export class ChaptersService {

  constructor(
    @Inject("CHAPTER_REPOSITORY")
    private chapterRepository: Repository<Chapter>,
  ) { }

  async create(createChapterDto: CreateChapterDto) {
    const chapter = {
      ...createChapterDto
    }
    await this.chapterRepository.save(chapter);
    return chapter;
  }

  async findAll() {
    return await this.chapterRepository.find({ relations: ['novel'] });
  }
  async recent() {
    return await this.chapterRepository.createQueryBuilder('chapter')
      .leftJoinAndSelect('chapter.novel', 'novels')
      .orderBy('chapter.createAt', 'DESC')
      .limit(24)
      .getMany();
  }

  async findOne(id: number) {
    const chapter = await this.chapterRepository.find({ where: { id: id }, relations: ['novel'] });
    if (!chapter) {
      throw new NotFoundException('chapter not found')
    }
    return chapter;
  }

  async update(id: number, updateChapterDto: UpdateChapterDto) {
    const chapter = await this.findOne(id);
    if (!chapter) {
      throw new NotFoundException('chapter not found');
    }
    const updatedUser = {
      ...updateChapterDto
    };
    await this.chapterRepository.update(id, updatedUser);
    return chapter;
  }

  async remove(id: number) {
    const chapter = await this.findOne(id);
    if (!chapter) {
      throw new NotFoundException('chapter not found');
    }
    await this.chapterRepository.delete(id);
    return chapter;
  }
}
