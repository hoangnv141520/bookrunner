import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateNovelLikeDto } from './dto/create-novel-like.dto';
import { UpdateNovelLikeDto } from './dto/update-novel-like.dto';
import { Repository } from 'typeorm';
import { NovelLike } from './entities/novel-like.entity';
import { Novel } from 'src/novels/entities/novel.entity';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class NovelLikeService {
  constructor(
    @Inject("NOVELLIKE_REPOSITORY")
    private novelLikeRepository: Repository<NovelLike>,
    @Inject("NOVEL_REPOSITORY")
    private novelRepository: Repository<Novel>,
    @Inject('USER_REPOSITORY')
    private userRepository: Repository<User>,
  ) { }
  async create(createNovelLikeDto: CreateNovelLikeDto) {
    const { user, novel } = createNovelLikeDto;
    console.log(user, novel);
    const isHave = await this.novelLikeRepository.findOne({ where: { user: { id: +user }, novel: { id: +novel } } });
    if (isHave) {
      const novelRecent = this.novelLikeRepository.delete(isHave.id)
      const novelFound = await this.novelRepository.findOne({ where: { id: +novel } })
      if (novelFound) {
        await this.novelRepository.save(
          {
            ...novelFound,
            like: novelFound?.like - 1
          }
        )
        return novelFound?.like - 1;
      }
      return 0;
    }
    const userFound = await this.userRepository.findOne({ where: { id: +user } });
    if (!userFound) {
      throw new NotFoundException('User not found');
    }

    const novelFound = await this.novelRepository.findOne({ where: { id: +novel } })
    if (!novelFound) {
      throw new NotFoundException('Novel not found');
    }

    const novelRecent = this.novelLikeRepository.create({
      user: userFound,
      novel: novelFound,
    })
    await this.novelRepository.save(
      {
        ...novelFound,
        like: novelFound?.like + 1
      }
    )
    await this.novelLikeRepository.save(novelRecent);
    return novelFound?.like + 1;
  }

  async findAll() {
    return await this.novelLikeRepository.find();
  }

  async findOne(id: number) {
    const novelLike = await this.findOne(id);
    if (!novelLike) {
      throw new NotFoundException('novelLike not found');
    }
    return novelLike;
  }

  async findByNovel(id: number) {
    const novelLike = await this.novelLikeRepository.find({ where: { novel: { id: id } } });
    if (!novelLike) {
      throw new NotFoundException('novelLike not found');
    }
    return novelLike;
  }

  async findByUser(id: number) {
    const novelLike = await this.novelLikeRepository.find({ where: { user: { id: id } }, relations: ['novel', 'novel.author'] });
    if (!novelLike) {
      throw new NotFoundException('novelLike not found');
    }
    return novelLike;
  }

  async update(id: number, updateNovelLikeDto: UpdateNovelLikeDto) {
    const novelLike = await this.findOne(id);
    if (!novelLike) {
      throw new NotFoundException('novelLike not found');
    }
    const updatedUser = {
      ...updateNovelLikeDto
    };
    await this.novelLikeRepository.update(id, updatedUser);
    return novelLike;
  }

  async remove(id: number) {
    const novelLike = await this.findOne(id);
    if (!novelLike) {
      throw new NotFoundException('novelLike not found');
    }
    await this.novelLikeRepository.delete(id);
    return novelLike;
  }
}
