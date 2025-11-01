import { Module } from '@nestjs/common';
import { CartDetailService } from './cart-detail.service';
import { CartDetailController } from './cart-detail.controller';
import { DatabaseModule } from 'src/database/database.module';
import { cartDetailProvider } from 'src/provider/cartdetail.provider';
import { userProvider } from 'src/provider/users.provider';
import { bookProvider } from 'src/provider/books.provider';

@Module({
  imports: [DatabaseModule],
  controllers: [CartDetailController],
  providers: [
    ...userProvider,
    ...bookProvider,
    ...cartDetailProvider,
    CartDetailService],
})
export class CartDetailModule {}
