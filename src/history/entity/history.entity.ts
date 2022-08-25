import { EntriesEntity } from 'src/entries/entity';
import { UserEntity } from 'src/user/entity';
import { Entity, Column, ObjectIdColumn, BeforeInsert, OneToMany, ManyToOne, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity({ name: 'history' })
export class HistoryEntity {
  @ObjectIdColumn()
  _id: string;

  @ManyToOne(() => UserEntity, (author: UserEntity) => author.history)
  public user: UserEntity;

  @ManyToOne(() => EntriesEntity, (dictionary: EntriesEntity) => dictionary.history)
  public dictionary: EntriesEntity;

  @CreateDateColumn()
  public createdAt;

  @UpdateDateColumn()
  public updatedAt;
}
