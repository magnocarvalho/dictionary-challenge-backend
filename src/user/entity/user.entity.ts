import { Entity, Column, ObjectIdColumn } from 'typeorm';

@Entity({ name: 'user' })
export class UserEntity {
  @ObjectIdColumn()
  _id: string;
  @Column()
  username: string;
  @Column()
  password: string;
}
