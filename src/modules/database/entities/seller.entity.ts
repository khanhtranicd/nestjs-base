import { Column, Entity, OneToOne } from 'typeorm';
import BaseEntity from './base';
import UserEntity from './user.entity';

@Entity({ name: 'sellers' })
class SellerEntity extends BaseEntity {
  @Column({ type: 'tinyint', nullable: false })
  status: number;

  @Column({ type: 'varchar', width: 20, nullable: false })
  first_name: string;

  @Column({ type: 'varchar', width: 20, nullable: false })
  last_name: string;

  @Column({ type: 'tinyint', nullable: false })
  gender: number;

  @Column({ type: 'date', nullable: false })
  birthday: Date;

  @Column({ type: 'varchar', width: 200, nullable: true })
  address: string;

  @Column({ type: 'varchar', width: 13, nullable: true })
  phone_number: string;

  @Column({ type: 'varchar', width: 255, nullable: false })
  email: string;

  @Column({ type: 'varchar', width: 10, nullable: true })
  tax_code: string;

  @Column({ type: 'varchar', width: 255, nullable: true })
  bank_name: string;

  @Column({ type: 'varchar', width: 20, nullable: true })
  account_number: string;

  @Column({ type: 'varchar', width: 2000, nullable: true })
  memo: string;

  @Column({ type: 'tinyint', nullable: false, default: 0 })
  delete_flg: number;

  full_name: string;

  @OneToOne(() => UserEntity, (user: UserEntity) => user.seller)
  public user: UserEntity;
}

export default SellerEntity;
