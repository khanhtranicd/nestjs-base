import { Column, Entity } from 'typeorm';
import BaseEntity from './base';

@Entity({ name: 'categories' })
class CategoryEntity extends BaseEntity {
  @Column({ type: 'int', nullable: false })
  genre_id: number;

  @Column({ type: 'varchar', width: 100, nullable: false })
  name: string;

  @Column({ type: 'tinyint', nullable: false })
  value: number;

  @Column({ type: 'tinyint', nullable: false })
  display_order: number;
}

export default CategoryEntity;
