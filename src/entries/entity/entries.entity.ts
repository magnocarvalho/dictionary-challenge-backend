import { Entity, Column, ObjectIdColumn, CreateDateColumn, UpdateDateColumn, OneToMany, ObjectID } from 'typeorm';

import { IEntries } from 'src/entries/interface/entries.interface';
import { IDictionary } from '../interface';
import { HistoryEntity } from 'src/history/entity/history.entity';
// import { IDictionary } from '../interfaces/dictionary.interface';

@Entity({ name: 'entries' })
export class EntriesEntity implements IEntries {
  @ObjectIdColumn()
  _id: ObjectID;
  @Column({
    nullable: false,
    length: 50,
    unique: true,
  })
  word: string;

  @Column()
  dictionary: IDictionary[];

  @CreateDateColumn()
  public createdAt;

  @UpdateDateColumn()
  public updatedAt;

  // @OneToMany(() => HistoryEntity, (hist: HistoryEntity) => hist.user)
  // public history: HistoryEntity[];
}
