import { EntriesEntity } from 'src/entries/entity';
import { UserEntity } from 'src/user/entity';
import { Entity, Column, ObjectIdColumn, BeforeInsert, OneToMany, ManyToOne, CreateDateColumn, UpdateDateColumn, ObjectID, Index, OneToOne, JoinColumn, Unique, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'favorite' })
@Unique(['userId', 'dictionaryId'])
export class FavoriteEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userId: string;

  @Column()
  dictionaryId: string;

  @CreateDateColumn()
  public createdAt;

  @UpdateDateColumn()
  public updatedAt;
}
