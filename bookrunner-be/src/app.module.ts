import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { NovelsModule } from './novels/novels.module';
import { RolesModule } from './roles/roles.module';
import { UsersController } from './users/users.controller';
import { CategoriesModule } from './categories/categories.module';
import { ChaptersModule } from './chapters/chapters.module';
import { AuthorsModule } from './authors/authors.module';
import { ArtistsModule } from './artists/artists.module';
import { DatabaseModule } from './database/database.module';
import { AuthModule } from './users/auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { NovelrecentModule } from './novelrecent/novelrecent.module';
import { UploadModule } from './upload/upload.module';
import { NovelVoteModule } from './novel-vote/novel-vote.module';
import { BookVoteModule } from './book-vote/book-vote.module';
import { BooksModule } from './books/books.module';
import { CartDetailModule } from './cart-detail/cart-detail.module';
import { PaymentModule } from './payment/payment.module';
import { paymentProvider } from './provider/payment.provider';
import { NovelLikeModule } from './novel-like/novel-like.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    DatabaseModule,
    UsersModule,
    NovelsModule,
    RolesModule,
    CategoriesModule,
    ChaptersModule,
    AuthorsModule,
    ArtistsModule,
    AuthModule,
    NovelrecentModule,
    UploadModule,
    NovelVoteModule,
    BookVoteModule,
    BooksModule,
    CartDetailModule,
    PaymentModule,
    NovelLikeModule,
  ],
  controllers: [AppController, UsersController],
  providers: [
    ...paymentProvider,
    AppService],
})
export class AppModule { }
