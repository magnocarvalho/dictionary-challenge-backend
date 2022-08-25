import { Entity, Column, ObjectIdColumn, BeforeInsert, OneToMany, ManyToOne, CreateDateColumn, UpdateDateColumn, ObjectID, Index } from 'typeorm';

@Entity({ name: 'favorite' })
export class FavoriteEntity {
  @ObjectIdColumn()
  _id: ObjectID;

  @Column()
  @Index()
  userId: string;

  @Column()
  @Index()
  dictionaryId: string;

  @CreateDateColumn()
  public createdAt;

  @UpdateDateColumn()
  public updatedAt;
}
