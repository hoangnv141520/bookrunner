import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CartDetailService } from './cart-detail.service';
import { CreateCartDetailDto } from './dto/create-cart-detail.dto';
import { UpdateCartDetailDto } from './dto/update-cart-detail.dto';
import { log } from 'console';

@Controller('cart-detail')
export class CartDetailController {
  constructor(private readonly cartDetailService: CartDetailService) { }

  @Post()
  async create(@Body() createCartDetailDto: CreateCartDetailDto) {
    const check = await this.cartDetailService.findByBookAndUser({
      bookId: createCartDetailDto.bookId,
      userId: createCartDetailDto.userId,
    });
    // console.log(check);
    if (check) {
      return this.cartDetailService.update(check.id, { quantity: check.quantity + createCartDetailDto.quantity });
    }

    return this.cartDetailService.create(createCartDetailDto);
  }


  @Get()
  findAll() {
    return this.cartDetailService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.cartDetailService.findOne(+id);
  }

  @Get('/user/:id')
  findByUser(@Param('id') id: string) {
    return this.cartDetailService.findByUser(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCartDetailDto: UpdateCartDetailDto) {
    return this.cartDetailService.update(+id, updateCartDetailDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.cartDetailService.remove(+id);
  }

  @Delete('user/:id')
  removeByIdUser(@Param('id') id: string) {
    return this.cartDetailService.removeByIdUser(+id);
  }

  @Post("add-quantity")
  async addQuantity(@Body() body: any) {
    return this.cartDetailService.addQuantity(body.id);
  }

  @Post("remove-quantity")
  async removeQuantity(@Body() body: any) {
    return this.cartDetailService.removeQuantity(body.id);
  }
}
