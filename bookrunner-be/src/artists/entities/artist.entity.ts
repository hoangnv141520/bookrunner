import { Novel } from 'src/novels/entities/novel.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany } from 'typeorm';

@Entity({ name: 'artists' })
export class Artist {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToMany(() => Novel, novel => novel.artist)
  novels: Novel[];

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  createat: Date;
}