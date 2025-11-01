import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Category } from './entities/category.entity';
import { Repository } from 'typeorm';
import { Book } from 'src/books/entities/book.entity';

@Injectable()
export class CategoriesService {

  constructor(
    @Inject("CATEGORY_REPOSITORY")
    private categoryRepository: Repository<Category>,
    @Inject("BOOK_REPOSITORY")
    private bookRepository: Repository<Book>,
  ) { }

  async create(createCategoryDto: CreateCategoryDto) {
    const category = {
      ...createCategoryDto
    }
    await this.categoryRepository.save(category);
    return category;
  }

  async findAll() {
    return await this.categoryRepository.find();
  }

  async findOne(id: number) {
    const category = await this.categoryRepository.find({ where: { id: id } });
    if (!category) {
      throw new NotFoundException('Category not found')
    }
    return category;
  }

  async updateView(id: number) {
    const category = await this.categoryRepository.find({ where: { id: id } });
    if (!category) {
      throw new NotFoundException('Category not found')
    }
    return category;
  }

  async update(id: number, updateCategoryDto: UpdateCategoryDto) {
    const category = await this.findOne(id);
    if (!category) {
      throw new NotFoundException('Category not found');
    }
    const updatedUser = {
      ...updateCategoryDto
    };
    await this.categoryRepository.update(id, updatedUser);
    return category;
  }

  async remove(id: number) {
    const category = await this.findOne(id);
    if (!category) {
      throw new NotFoundException('Category not found');
    }
    await this.categoryRepository.delete(id);
    return category;
  }

  async findBooksByCategory(categoryId: number): Promise<Book[]> {
    const category = await this.categoryRepository.findOne({
      where: { id: categoryId },
    });
    if (!category) {
      throw new Error('Category not found');
    }
    return await this.bookRepository
      .createQueryBuilder('book')
      .leftJoinAndSelect('book.categories', 'category')
      .where('category.id = :categoryId', { categoryId })
      .getMany();
  }
}
