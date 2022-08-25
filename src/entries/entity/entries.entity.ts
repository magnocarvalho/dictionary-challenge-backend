import { Entity, Column, ObjectIdColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { IDictionary } from 'src/common/interfaces';
import { IEntries } from 'src/common/interfaces/entries.interface';
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
