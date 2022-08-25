import { Entity, Column, ObjectIdColumn, BeforeInsert } from 'typeorm';
import * as bcrypt from 'bcryptjs';

@Entity({ name: 'user' })
export class UserEntity {
  @ObjectIdColumn()
  _id: string;
  @Column({ type: String, length: 124, nullable: false })
  name: string;
  @Column({ type: String, length: 50, unique: true, nullable: false })
  email: string;
  @Column({ type: String, length: 56, nullable: false })
  password: string;

  @BeforeInsert()
  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 8);
  }

  async validatePassword(password: string): Promise<boolean> {
    return bcrypt.compare(password, this.password);
  }
}
