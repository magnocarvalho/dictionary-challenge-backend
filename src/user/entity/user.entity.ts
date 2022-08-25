import { Entity, Column, ObjectIdColumn, BeforeInsert, OneToMany, CreateDateColumn, UpdateDateColumn, ObjectID, Index } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { HistoryEntity } from 'src/history/entity';

@Entity({ name: 'user' })
export class UserEntity {
  @ObjectIdColumn()
  _id: ObjectID;
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

  // @OneToMany(() => HistoryEntity, (hist: HistoryEntity) => hist.user)
  // public history: HistoryEntity[];

  @CreateDateColumn()
  public createdAt;

  @UpdateDateColumn()
  public updatedAt;
}
