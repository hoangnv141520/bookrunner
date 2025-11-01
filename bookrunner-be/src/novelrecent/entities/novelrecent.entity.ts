import { Novel } from "src/novels/entities/novel.entity";
import { User } from "src/users/entities/user.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'novelrecent' })
export class Novelrecent {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  last_read_chapter_id: number;

  @Column()
  last_read_chapter_name: string;

  @Column()
  last_read_date: Date;

  @ManyToOne(() => User, (user) => user.novelrecents)
  user: User;

  @ManyToOne(() => Novel, (novel) => novel.novelrecents)
  novel: Novel;

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  createat: Date;
}
