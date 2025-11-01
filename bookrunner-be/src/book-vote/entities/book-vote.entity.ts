import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, Unique, CreateDateColumn } from 'typeorm';
import { User } from 'src/users/entities/user.entity';
import { Book } from 'src/books/entities/book.entity';

@Entity({ name: 'book_votes' })
@Unique(['user', 'book'])
export class BookVote {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, user => user.bookVotes, { onDelete: 'CASCADE' })
  user: User;

  @ManyToOne(() => Book, book => book.votes, { onDelete: 'CASCADE' })
  book: Book;

  @Column()
  value: number;

  @CreateDateColumn()
  votedAt: Date;
}