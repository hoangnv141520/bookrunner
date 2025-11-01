import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateBookVoteDto } from './dto/create-book-vote.dto';
import { UpdateBookVoteDto } from './dto/update-book-vote.dto';
import { BookVote } from './entities/book-vote.entity';
import { Repository } from 'typeorm';

@Injectable()
export class BookVoteService {
  constructor(
    @Inject("BOOKVOTE_REPOSITORY")
    private bookVoteRepository: Repository<BookVote>,
  ) { }
  async create(createBookVoteDto: CreateBookVoteDto) {
    const bookVote = this.bookVoteRepository.create(createBookVoteDto);
    return await this.bookVoteRepository.save(bookVote);
  }

  async findAll() {
    return await this.bookVoteRepository.find({ relations: ['user', 'book'] });
  }

  async findOne(id: number) {
    const bookVote = await this.findOne(id);
    if (!bookVote) {
      throw new NotFoundException('bookVote not found');
    }
    return bookVote;

  }

  async update(id: number, updateBookVoteDto: UpdateBookVoteDto) {
    const bookVote = await this.findOne(id);
    if (!bookVote) {
      throw new NotFoundException('bookVote not found');
    }
    const updatedUser = {
      ...updateBookVoteDto
    };
    await this.bookVoteRepository.update(id, updatedUser);
    return bookVote;
  }

  async remove(id: number) {
    const bookVote = await this.findOne(id);
    if (!bookVote) {
      throw new NotFoundException('bookVote not found');
    }
    await this.bookVoteRepository.delete(id);
    return bookVote;
  }
}
