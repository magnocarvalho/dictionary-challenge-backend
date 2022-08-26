import { EntriesEntity } from 'src/entries/entity';
import { UserEntity } from 'src/user/entity';
import { Entity, Column, ObjectIdColumn, BeforeInsert, OneToMany, ManyToOne, CreateDateColumn, UpdateDateColumn, ObjectID, Index, OneToOne, JoinColumn, Unique, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'favorite' })
export class FavoriteEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn()
  public createdAt;

  @UpdateDateColumn()
  public updatedAt;

  @ManyToOne(() => UserEntity, (user) => user.favorite)
  @JoinColumn()
  user: UserEntity;

  @ManyToOne(() => EntriesEntity, (user) => user.dictionary)
  @JoinColumn()
  dictionary: EntriesEntity;
}
