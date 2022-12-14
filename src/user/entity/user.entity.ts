import { Entity, Column, BeforeInsert, OneToMany, CreateDateColumn, UpdateDateColumn, PrimaryGeneratedColumn, DeleteDateColumn } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { HistoryEntity } from 'src/history/entity';
import { FavoriteEntity } from 'src/favorite/entity';

@Entity({ name: 'user' })
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ type: String, length: 124, nullable: false })
  name: string;
  @Column({ type: String, length: 50, unique: true, nullable: false })
  email: string;
  @Column({ type: String, nullable: false })
  password: string;

  @BeforeInsert()
  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 8);
  }

  async validatePassword(password: string): Promise<boolean> {
    return bcrypt.compare(password, this.password);
  }

  @OneToMany(() => HistoryEntity, (hist: HistoryEntity) => hist.user)
  public history: HistoryEntity[];

  @OneToMany(() => FavoriteEntity, (favorite: FavoriteEntity) => favorite.user)
  public favorite: FavoriteEntity[];

  @CreateDateColumn()
  public createdAt;

  @UpdateDateColumn()
  public updatedAt;

  @DeleteDateColumn()
  public deletedAt: Date;
}
