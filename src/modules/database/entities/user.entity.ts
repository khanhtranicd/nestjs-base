import { BeforeInsert, BeforeUpdate, Column, Entity, JoinColumn, ManyToOne, OneToOne } from 'typeorm';
import bcrypt from 'bcrypt';
import BaseEntity from './base';

@Entity({ name: 'users' })
class UserEntity extends BaseEntity {
  @Column({ type: 'varchar', width: 100, nullable: false })
  email: string;

  @Column({ type: 'varchar', width: 100, nullable: false })
  password: string;

  @Column({ type: 'varchar', width: 100, nullable: false })
  name: string;

  @Column({ type: 'varchar', width: 12, nullable: false })
  phone: string;

  @Column({ type: 'tinyint', nullable: false, default: 0 })
  authority: number;

  @Column({ type: 'tinyint', nullable: false, default: 0 })
  delete_flg: number;

  @BeforeInsert() async hasPassword() {
    this.password = await bcrypt.hash(this.password, 10);
  }

  @BeforeUpdate()
  async hashPasswordBeforeUpdate() {
    this.password && (this.password = await bcrypt.hash(this.password, 10));
  }
}

export default UserEntity;
