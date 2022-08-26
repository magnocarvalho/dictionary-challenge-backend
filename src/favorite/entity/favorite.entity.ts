import { EntriesEntity } from 'src/entries/entity';
import { UserEntity } from 'src/user/entity';
import { Entity, ManyToOne, CreateDateColumn, UpdateDateColumn, JoinColumn, Unique, PrimaryGeneratedColumn, DeleteDateColumn } from 'typeorm';

@Entity({ name: 'favorite' })
@Unique(['user', 'dictionary'])
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

  @DeleteDateColumn()
  public deletedAt: Date;
}
