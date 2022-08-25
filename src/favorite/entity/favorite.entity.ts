import { EntriesEntity } from 'src/entries/entity';
import { UserEntity } from 'src/user/entity';
import { Entity, Column, ObjectIdColumn, BeforeInsert, OneToMany, ManyToOne, CreateDateColumn, UpdateDateColumn, ObjectID, Index, OneToOne, JoinColumn, Unique } from 'typeorm';

@Entity({ name: 'favorite' })
@Unique(['userId', 'dictionaryId'])
export class FavoriteEntity {
  @ObjectIdColumn()
  _id: ObjectID;

  // @Column()
  // @Index()
  // userId: string;

  // @Column()
  // @Index()
  // dictionaryId: string;
  // @OneToOne(() => UserEntity)
  // @JoinColumn()
  // user: UserEntity;

  // @OneToOne(() => EntriesEntity)
  // @JoinColumn()
  // dictionary: EntriesEntity;
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
