import { Entity, Column, ObjectIdColumn } from 'typeorm';

@Entity({ name: 'user' })
export class UserEntity {
  @ObjectIdColumn()
  _id: string;
  @Column({ type: String, length: 124 })
  name: string;
  @Column({ type: String, length: 50, unique: true })
  email: string;
  @Column()
  password: string;
}
