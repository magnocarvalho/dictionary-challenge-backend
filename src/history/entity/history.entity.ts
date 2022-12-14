import { EntriesEntity } from 'src/entries/entity';
import { UserEntity } from 'src/user/entity';
import { Entity, CreateDateColumn, UpdateDateColumn, PrimaryGeneratedColumn, JoinColumn, ManyToOne, DeleteDateColumn } from 'typeorm';

@Entity({ name: 'history' })
export class HistoryEntity {
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
