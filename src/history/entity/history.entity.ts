import { EntriesEntity } from 'src/entries/entity';
import { UserEntity } from 'src/user/entity';
import { Entity, Column, ObjectIdColumn, BeforeInsert, OneToMany, ManyToOne, CreateDateColumn, UpdateDateColumn, ObjectID, Index, Unique } from 'typeorm';

@Entity({ name: 'history' })
@Unique(['userId', 'dictionaryId'])
export class HistoryEntity {
  @ObjectIdColumn()
  _id: ObjectID;

  // @Column()
  // @ManyToOne(() => UserEntity, (user: UserEntity) => user.history)
  // user: UserEntity;
  @Column()
  userId: string;

  // @ManyToOne(() => EntriesEntity, (dictionary: EntriesEntity) => dictionary.history)
  // dictionary: EntriesEntity;

  @Column()
  dictionaryId: string;

  @CreateDateColumn()
  public createdAt;

  @UpdateDateColumn()
  public updatedAt;
}
