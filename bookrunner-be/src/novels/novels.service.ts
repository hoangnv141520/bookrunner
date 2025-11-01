import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateNovelDto } from './dto/create-novel.dto';
import { UpdateNovelDto } from './dto/update-novel.dto';
import { Repository } from 'typeorm';
import { Novel } from './entities/novel.entity';

@Injectable()
export class NovelsService {
  constructor(
    @Inject("NOVEL_REPOSITORY")
    private novelRepository: Repository<Novel>,
  ) { }
  async create(createNovelDto: CreateNovelDto) {
    const novel = {
      ...createNovelDto
    }
    await this.novelRepository.save(novel);
    return novel;
  }

  async findAll() {
    return await this.novelRepository.find({ relations: ['chapters', 'categories', 'author', 'artist', 'user'] });
  }

  async findOne(id: number) {
    const novel = await this.novelRepository.find({ where: { id: id }, relations: ['chapters', 'categories', 'author', 'artist', 'user'] });
    if (!novel) {
      throw new NotFoundException('novel not found')
    }
    return novel;
  }

  async updateView(id: number) {
    const novel = await this.novelRepository.findOne({ where: { id: id } });
    if (!novel) {
      throw new NotFoundException('novel not found')
    } else {
      novel.view += 1;
      await this.novelRepository.update(id, novel);
    }
    return novel;
  }

  async view() {
    return await this.novelRepository.createQueryBuilder('novel')
      .orderBy('novel.view', 'DESC')
      .limit(8)
      .getMany();
  }

  async recent() {
    return await this.novelRepository.createQueryBuilder('novel')
      .leftJoinAndSelect('novel.author', 'authors') 
      .leftJoinAndSelect('novel.artist', 'artists') 
      .leftJoinAndSelect('novel.categories', 'categories')
      .orderBy('novel.createat', 'DESC')
      .limit(6)
      .getMany();
  }
  

  async update(id: number, updateNovelDto: UpdateNovelDto) {
    const novel = await this.findOne(id);
    if (!novel) {
      throw new NotFoundException('novel not found');
    }
    const updatedUser = {
      ...updateNovelDto
    };
    await this.novelRepository.update(id, updatedUser);
    return novel;
  }

  async remove(id: number) {
    const novel = await this.findOne(id);
    if (!novel) {
      throw new NotFoundException('novel not found');
    }
    await this.novelRepository.delete(id);
    return novel;
  }
}
