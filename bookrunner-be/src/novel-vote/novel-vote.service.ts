import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateNovelVoteDto } from './dto/create-novel-vote.dto';
import { UpdateNovelVoteDto } from './dto/update-novel-vote.dto';
import { Repository } from 'typeorm';
import { NovelVote } from './entities/novel-vote.entity';

@Injectable()
export class NovelVoteService {
  constructor(
    @Inject("NOVELVOTE_REPOSITORY")
    private novelVoteRepository: Repository<NovelVote>,
  ) { }
  async create(createNovelVoteDto: CreateNovelVoteDto) {
    const novelVote = this.novelVoteRepository.create(createNovelVoteDto);
    return await this.novelVoteRepository.save(novelVote);
  }

  async findAll() {
    return await this.novelVoteRepository.find();
  }

  async findOne(id: number) {
    const novelVote = await this.findOne(id);
    if (!novelVote) {
      throw new NotFoundException('novelVote not found');
    }
    return novelVote;
  }

  async update(id: number, updateNovelVoteDto: UpdateNovelVoteDto) {
    const novelVote = await this.findOne(id);
    if (!novelVote) {
      throw new NotFoundException('novelVote not found');
    }
    const updatedUser = {
      ...updateNovelVoteDto
    };
    await this.novelVoteRepository.update(id, updatedUser);
    return novelVote;
  }

  async remove(id: number) {
    const novelVote = await this.findOne(id);
    if (!novelVote) {
      throw new NotFoundException('novelVote not found');
    }
    await this.novelVoteRepository.delete(id);
    return novelVote;
  }
}
