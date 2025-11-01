import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, Unique, CreateDateColumn } from 'typeorm';
import { User } from 'src/users/entities/user.entity';
import { Novel } from 'src/novels/entities/novel.entity';

@Entity({ name: 'novel_likes' })
@Unique(['user', 'novel'])
export class NovelLike {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => User, user => user.novelVotes, { onDelete: 'CASCADE' })
    user: User;

    @ManyToOne(() => Novel, novel => novel.votes, { onDelete: 'CASCADE' })
    novel: Novel;

    @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
    createat: Date;
}
