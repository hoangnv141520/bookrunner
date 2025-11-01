import { Novel } from 'src/novels/entities/novel.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';

@Entity({ name: 'chapters' })
export class Chapter {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ type: 'mediumtext' })
  content: string;

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  createat: Date;

  @ManyToOne(() => Novel, (novel) => novel.chapters)
  novel: Novel;
}
