import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateCartDetailDto } from './dto/create-cart-detail.dto';
import { UpdateCartDetailDto } from './dto/update-cart-detail.dto';
import { Repository } from 'typeorm';
import { CartDetail } from './entities/cart-detail.entity';
import { User } from 'src/users/entities/user.entity';
import { Book } from 'src/books/entities/book.entity';

@Injectable()
export class CartDetailService {
  constructor(
    @Inject("CARTDETAIL_REPOSITORY")
    private cartDetailRepository: Repository<CartDetail>,
    @Inject("USER_REPOSITORY")
    private userRepository: Repository<User>,
    @Inject("BOOK_REPOSITORY")
    private bookRepository: Repository<Book>,
  ) { }

  async create(createCartDetailDto: CreateCartDetailDto) {
    const book = await this.bookRepository.findOne({
      where: { id: createCartDetailDto.bookId },
    });
    const user = await this.userRepository.findOne({
      where: { id: createCartDetailDto.userId },
    });
    if (!book) {
      throw new Error('Book not found');
    }
    if (!user) {
      throw new Error('User not found');
    }
    const cartDetail = this.cartDetailRepository.create({
      quantity: createCartDetailDto.quantity,
      book: book,
      user: user,
    });
    // console.log(cartDetail);
    // console.log(createCartDetailDto);
    return await this.cartDetailRepository.save(cartDetail);
  }


  async findAll() {
    return await this.cartDetailRepository.find({ relations: ['book', 'user'] });
  }

  async findOne(id: number) {
    const cartDetail = await this.cartDetailRepository.findOne({
      where: { id: id },
      relations: ['book', 'user'],
    });
    if (!cartDetail) {
      throw new NotFoundException('Cart detail not found');
    }
    return cartDetail;
  }

  async findByUser(id: number) {
    const cartDetail = await this.cartDetailRepository.find({
      where: { user: { id: id } },
      relations: ['book', 'book.author', 'user'],
    });
    if (!cartDetail) {
      throw new NotFoundException('Cart detail not found');
    }
    return cartDetail;
  }


  async findByBookAndUser(query: { bookId: number; userId: number }) {
    return this.cartDetailRepository.findOne({
      where: {
        book: { id: query.bookId },
        user: { id: query.userId },
      },
      relations: ['book', 'user'],
    });
  }


  async update(id: number, updateCartDetailDto: UpdateCartDetailDto) {
    const cartDetail = await this.findOne(id);
    if (!cartDetail) {
      throw new NotFoundException('cartDetail not found');
    }
    const updatedUser = {
      ...updateCartDetailDto
    };
    await this.cartDetailRepository.update(id, updatedUser);
    return cartDetail;
  }

  async remove(id: number) {
    const cartDetail = await this.findOne(id);
    if (!cartDetail) {
      throw new NotFoundException('cartDetail not found');
    }
    await this.cartDetailRepository.delete(id);
    return cartDetail;
  }

  async removeByIdUser(id: number) {
    const cartDetail = await this.cartDetailRepository.find({ where: { user: { id: id } } });
    if (!cartDetail) {
      throw new NotFoundException('cartDetail not found');
    }
    // console.log(cartDetail);
    cartDetail.forEach(async (cartDetail) => {
      await this.cartDetailRepository.delete(cartDetail.id);
    });
    return cartDetail;
  }

  async addQuantity(id: number) {
    const cartDetail = await this.findOne(id);
    if (!cartDetail) {
      throw new NotFoundException('cartDetail not found');
    }
    cartDetail.quantity += 1;
    await this.cartDetailRepository.save(cartDetail);
    return cartDetail;
  }

  async removeQuantity(id: number) {
    const cartDetail = await this.findOne(id);
    if (!cartDetail) {
      throw new NotFoundException('cartDetail not found');
    }
    cartDetail.quantity -= 1;
    await this.cartDetailRepository.save(cartDetail);
    return cartDetail;
  }


}
