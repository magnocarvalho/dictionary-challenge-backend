import { Entity, Column, ObjectIdColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';

import { IEntries } from 'src/entries/interface/entries.interface';
import { IDictionary } from '../interface';
// import { IDictionary } from '../interfaces/dictionary.interface';

@Entity({ name: 'entries' })
export class EntriesEntity implements IEntries {
  @ObjectIdColumn()
  _id: string;
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
}
