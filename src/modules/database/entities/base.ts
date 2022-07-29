import { Column, PrimaryGeneratedColumn } from 'typeorm';

export default class BaseEntity {
  @PrimaryGeneratedColumn('increment')
  public id: number;

  @Column({
    type: 'datetime',
    nullable: false,
    default: () => 'CURRENT_TIMESTAMP',
  })
  created_date: Date;

  @Column({
    type: 'datetime',
    nullable: false,
    default: () => 'CURRENT_TIMESTAMP',
  })
  updated_date: Date;

  @Column({
    type: 'datetime',
    nullable: false,
    default: () => 'CURRENT_TIMESTAMP',
  })
  last_updated: Date;

  @Column({ type: 'int', nullable: false, default: 0 })
  public created_by: number;

  @Column({ type: 'int', nullable: false, default: 0 })
  public updated_by: number;
}
