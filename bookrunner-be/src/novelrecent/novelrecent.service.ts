import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateNovelrecentDto } from './dto/create-novelrecent.dto';
import { UpdateNovelrecentDto } from './dto/update-novelrecent.dto';
import { Novelrecent } from './entities/novelrecent.entity';
import { Repository } from 'typeorm';
import { User } from 'src/users/entities/user.entity';
import { Novel } from 'src/novels/entities/novel.entity';

@Injectable()
export class NovelrecentService {

  constructor(
    @Inject("NOVELRECENT_REPOSITORY")
    private novelrecentRepository: Repository<Novelrecent>,
    @Inject('USER_REPOSITORY')
    private userRepository: Repository<User>,
    @Inject("NOVEL_REPOSITORY")
    private novelRepository: Repository<Novel>,
  ) { }
  async create(createNovelrecentDto: CreateNovelrecentDto) {
    // console.log(createNovelrecentDto);
    const { user, novel, ...rest } = createNovelrecentDto;

    const isHave = await this.novelrecentRepository.findOne({ where: { user: { id: user.id }, novel: { id: novel.id } } });
    if (isHave) {
      const novelRecent = this.novelrecentRepository.create({
        last_read_date: new Date(),
        ...rest,
      })
      await this.novelrecentRepository.update(isHave.id, novelRecent);
      return isHave;
    }
    const userFound = await this.userRepository.findOne({ where: { id: +user } });
    if (!userFound) {
      throw new NotFoundException('User not found');
    }

    const novelFound = await this.novelRepository.findOne({ where: { id: +novel } })
    if (!novelFound) {
      throw new NotFoundException('Novel not found');
    }

    const novelRecent = this.novelrecentRepository.create({
      user: userFound,
      novel: novelFound,
      last_read_date: new Date(),
      ...rest,
    })
    await this.novelrecentRepository.save(novelRecent);
    return novel;
  }

  async findAll() {
    return await this.novelrecentRepository.find();
  }

  async findOne(id: number) {
    const novel = await this.novelrecentRepository.find({ where: { id: id } });
    if (!novel) {
      throw new NotFoundException('novel not found')
    }
    return novel;
  }

  async findByUser(id: number) {
    const novel = await this.novelrecentRepository.find({ where: { user: { id: id } }, relations: ['novel', 'novel.author'] });
    if (!novel) {
      throw new NotFoundException('novel not found')
    }
    return novel;
  }

  async update(id: number, updateNovelrecentDto: UpdateNovelrecentDto) {
    const novel = await this.findOne(id);
    if (!novel) {
      throw new NotFoundException('novel not found');
    }
    const updatedUser = {
      ...updateNovelrecentDto
    };
    await this.novelrecentRepository.update(id, updatedUser);
    return novel;
  }

  async remove(id: number) {
    const novel = await this.findOne(id);
    if (!novel) {
      throw new NotFoundException('novel not found');
    }
    await this.novelrecentRepository.delete(id);
    return novel;
  }
}
