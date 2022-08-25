import { Entity, Column, ObjectIdColumn } from 'typeorm';
import { IDictionary } from 'src/common/interfaces';
// import { IDictionary } from '../interfaces/dictionary.interface';

@Entity()
export class Entries {
  @ObjectIdColumn()
  _id: string;
  @Column()
  word: string;
  @Column()
  dictionary: IDictionary;
}
