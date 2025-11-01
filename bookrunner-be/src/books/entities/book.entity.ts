import { Entity, PrimaryGeneratedColumn, Column, JoinTable, ManyToMany, ManyToOne, OneToMany } from "typeorm";
import { Author } from "src/authors/entities/author.entity";
import { BookVote } from "src/book-vote/entities/book-vote.entity";
import { CartDetail } from "src/cart-detail/entities/cart-detail.entity";
import { Category } from "src/categories/entities/category.entity";

@Entity({ name: 'books' })
export class Book {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column()
    image: string;

    @Column({ type: 'mediumtext' })
    novel_desc: string;

    @Column()
    price: number;

    @Column()
    publisher: string;

    @Column()
    pages: number;

    @Column({ type: 'datetime' })
    releasedate: Date;

    @ManyToMany(() => Category)
    @JoinTable()
    categories: Category[];

    @ManyToOne(() => Author, author => author.novels)
    author: Author;

    @OneToMany(() => BookVote, vote => vote.book)
    votes: BookVote[];

    @OneToMany(() => CartDetail, cartDetail => cartDetail.book)
    cartDetail: CartDetail[];

    @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
    createat: Date;
}
