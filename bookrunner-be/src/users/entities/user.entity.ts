import { BookVote } from 'src/book-vote/entities/book-vote.entity';
import { CartDetail } from 'src/cart-detail/entities/cart-detail.entity';
import { NovelVote } from 'src/novel-vote/entities/novel-vote.entity';
import { Novelrecent } from 'src/novelrecent/entities/novelrecent.entity';
import { Novel } from 'src/novels/entities/novel.entity';
import { Payment } from 'src/payment/entities/payment.entity';
import { Role } from 'src/roles/entities/role.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany, JoinColumn, OneToOne } from 'typeorm';

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  username: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({ nullable: true })
  dateOfBirth: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  joinDate: Date;

  @Column({ nullable: true })
  desc: string;

  @Column({ default: false })
  isVerified: boolean;

  @Column({ default: 'https://i.imgur.com/zj1tRIM.png', nullable: true })
  image: string;x

  @ManyToOne(() => Role, (role) => role.users)
  role: Role;

  @OneToMany(() => CartDetail, cartDetail => cartDetail.user)
  cartDetail: CartDetail[];

  @OneToMany(() => Novel, novel => novel.user)
  novels: Novel[];

  @OneToMany(() => NovelVote, vote => vote.user)
  novelVotes: NovelVote[];

  @OneToMany(() => NovelVote, vote => vote.user)
  bookVotes: BookVote[];

  @OneToMany(() => Payment, payment => payment.user)
  payment: Payment[];

  @OneToMany(() => Novelrecent, novelrecent => novelrecent.user)
  novelrecents: Novelrecent[];
}
