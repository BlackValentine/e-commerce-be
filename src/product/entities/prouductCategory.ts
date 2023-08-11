import { BaseEntity } from 'src/base.entity';
import { Column, Entity } from 'typeorm';

@Entity({
  name: 'product_category',
})
export class ProductCategoryEntity extends BaseEntity {
  @Column()
  name: string;
}
