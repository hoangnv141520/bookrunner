import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateAuthorDto } from './dto/create-author.dto';
import { UpdateAuthorDto } from './dto/update-author.dto';
import { Author } from './entities/author.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AuthorsService {

  constructor(
    @Inject("AUTHOR_REPOSITORY")
    private authorRepository: Repository<Author>,
  ) { }
  async create(createAuthorDto: CreateAuthorDto) {
    const author = {
      ...createAuthorDto
    }
    await this.authorRepository.save(author);
    return author;
  }

  async findAll() {
    return await this.authorRepository.find();
  }

  async findOne(id: number) {
    const author = await this.authorRepository.find({ where: { id: id } });
    if (!author) {
      throw new NotFoundException('Author not found')
    }
    return author;
  }

  async update(id: number, updateAuthorDto: UpdateAuthorDto) {
    const author = await this.findOne(id);
    if (!author) {
      throw new NotFoundException('Author not found');
    }
    const updatedUser = {
      ...updateAuthorDto
    };
    await this.authorRepository.update(id, updatedUser);
    return author;
  }

  async remove(id: number) {
    const author = await this.findOne(id);
    if (!author) {
      throw new NotFoundException('Author not found');
    }
    await this.authorRepository.delete(id);
    return author;
  }
}
