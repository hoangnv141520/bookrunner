import { User } from "src/users/entities/user.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'payment' })
export class Payment {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    orderId: string;

    @Column()
    amount: number;

    @Column()
    message: string;

    @Column()
    payUrl: string;

    @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
    createat: Date;

    @Column()
    resultCode: number;

    @ManyToOne(() => User, user => user.payment)
    user: User;
}
