import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { In, Repository } from 'typeorm';
import { Book } from './entities/book.entity';
import { Author } from 'src/authors/entities/author.entity';
import { Category } from 'src/categories/entities/category.entity';

@Injectable()
export class BooksService {
  constructor(
    @Inject("BOOK_REPOSITORY")
    private bookRepository: Repository<Book>,
    @Inject("AUTHOR_REPOSITORY")
    private authorRepository: Repository<Author>,
    @Inject("CATEGORY_REPOSITORY")
    private categoryRepository: Repository<Category>,
  ) { }
  async create(createBookDto: CreateBookDto) {
    const { author, categories, ...rest } = createBookDto;

    let authorEntity = await this.authorRepository.findOne({ where: { name: author.name } });
    if (!authorEntity) {
      authorEntity = this.authorRepository.create({ name: author.name });
      await this.authorRepository.save(authorEntity);
    }

    let categoryEntities: Category[] = [];
    if (categories && categories.length > 0) {
      const ids = categories.map(c => c.id);
      categoryEntities = await this.categoryRepository.findBy({
        id: In(ids),
      });
    }

    const book = this.bookRepository.create({
      ...rest,
      releasedate: rest.releasedate ? new Date(rest.releasedate) : new Date(),
      author: authorEntity,
      categories: categoryEntities,
    });

    return await this.bookRepository.save(book);
  }

  async findAll() {
    return await this.bookRepository.find({ relations: ['author', 'categories', 'votes'] });
  }

  async findOne(id: number) {
    const book = await this.bookRepository.findOne({
      where: { id: id },
      relations: ['author', 'categories', 'votes']
    });
    if (!book) {
      throw new NotFoundException('book not found');
    }
    return book;
  }


  async update(id: number, updateBookDto: UpdateBookDto) {
    const book = await this.findOne(id);
    if (!book) {
      throw new NotFoundException('book not found');
    }
    const {
      title,
      image,
      novel_desc,
      price,
      publisher,
      pages,
      releasedate,
      author,
      categories,
    } = updateBookDto;

    let authorEntity = await this.authorRepository.findOneBy({ name: author?.name });
    if (!authorEntity) {
      authorEntity = await this.authorRepository.save(this.authorRepository.create({ name: author?.name }));
    }
    let categoryEntities: Category[] = [];
    if (categories && categories.length > 0) {
      const ids = categories.map(c => c.id);
      categoryEntities = await this.categoryRepository.findBy({
        id: In(ids),
      });
    }

    Object.assign(book, {
      title,
      image,
      novel_desc,
      price,
      publisher,
      pages,
      releasedate: releasedate ? new Date(releasedate) : book.releasedate,
      author: authorEntity,
      categories: categoryEntities,
    });

    return await this.bookRepository.save(book);
  }


  async remove(id: number) {
    const book = await this.findOne(id);
    if (!book) {
      throw new NotFoundException('book not found');
    }
    await this.bookRepository.delete(id);
    return book;
  }
}
