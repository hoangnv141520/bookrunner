import { Artist } from 'src/artists/entities/artist.entity';
import { Author } from 'src/authors/entities/author.entity';
import { Category } from 'src/categories/entities/category.entity';
import { Chapter } from 'src/chapters/entities/chapter.entity';
import { NovelVote } from 'src/novel-vote/entities/novel-vote.entity';
import { Novelrecent } from 'src/novelrecent/entities/novelrecent.entity';
import { User } from 'src/users/entities/user.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany, ManyToMany, JoinTable } from 'typeorm';

@Entity({ name: 'novels' })
export class Novel {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  image: string;

  @Column()
  novel_desc: string;

  @ManyToOne(() => Author, author => author.novels)
  author: Author;

  @ManyToOne(() => Artist, artist => artist.novels)
  artist: Artist;

  @OneToMany(() => Chapter, chapter => chapter.novel)
  chapters: Chapter[];

  @Column()
  view: number;

  @Column()
  like: number;

  @Column()
  numberofvote: number;

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  createat: Date;

  @ManyToMany(() => Category)
  @JoinTable()
  categories: Category[];

  @ManyToOne(() => User, (user) => user.novels)
  user: User;

  @OneToMany(() => NovelVote, vote => vote.novel)
  votes: NovelVote[];

  @OneToMany(() => Novelrecent, novelrecent => novelrecent.novel)
  novelrecents: Novelrecent[];
}
