import { Entity, Column, ObjectIdColumn, CreateDateColumn, UpdateDateColumn, OneToMany, ObjectID, PrimaryGeneratedColumn } from 'typeorm';

import { IEntries } from 'src/entries/interface/entries.interface';
import { IDictionary } from '../interface';
import { HistoryEntity } from 'src/history/entity/history.entity';
// import { IDictionary } from '../interfaces/dictionary.interface';

@Entity({ name: 'entries' })
export class EntriesEntity implements IEntries {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    nullable: false,
    length: 50,
    unique: true,
  })
  word: string;

  @Column({
    type: 'jsonb',
  })
  dictionary: IDictionary[];

  @CreateDateColumn()
  public createdAt;

  @UpdateDateColumn()
  public updatedAt;

  // @OneToMany(() => HistoryEntity, (hist: HistoryEntity) => hist.user)
  // public history: HistoryEntity[];
}
