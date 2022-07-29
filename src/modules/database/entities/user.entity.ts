import { BeforeInsert, BeforeUpdate, Column, Entity, JoinColumn, ManyToOne, OneToOne } from 'typeorm';
import bcrypt from 'bcrypt';
import BaseEntity from './base';
import SellerEntity from './seller.entity';

@Entity({ name: 'users' })
class UserEntity extends BaseEntity {
  @ManyToOne(() => SellerEntity, (seller) => seller.id)
  @JoinColumn({ name: 'seller_id' })
  @Column({ type: 'int', nullable: false })
  seller_id: number;

  @Column({ type: 'varchar', width: 100, nullable: false })
  user_password: string;

  @Column({ type: 'tinyint', nullable: false })
  authority: number;

  @Column({ type: 'tinyint', nullable: false, default: 0 })
  delete_flg: number;

  @BeforeInsert() async hasPassword() {
    this.user_password = await bcrypt.hash(this.user_password, 10);
  }

  @BeforeUpdate()
  async hashPasswordBeforeUpdate() {
    this.user_password && (this.user_password = await bcrypt.hash(this.user_password, 10));
  }

  @OneToOne(() => SellerEntity, (seller: SellerEntity) => seller.user, {
    cascade: ['update', 'insert'],
    eager: true,
  })
  @JoinColumn({ name: 'seller_id' })
  public seller: SellerEntity;
}

export default UserEntity;
