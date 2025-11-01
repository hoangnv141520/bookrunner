import { Book } from "src/books/entities/book.entity";
import { User } from "src/users/entities/user.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'cart_details' })
export class CartDetail {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    quantity: number;

    @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
    createat: Date;

    @ManyToOne(() => Book, book => book.votes, { onDelete: 'CASCADE' })
    book: Book;

    @ManyToOne(() => User, user => user.cartDetail, { onDelete: 'CASCADE' })
    user: User;
}
