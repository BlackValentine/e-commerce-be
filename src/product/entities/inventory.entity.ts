import { BaseEntity } from 'src/base.entity';
import { Column, Entity, ManyToOne } from 'typeorm';
import { Product } from './product.entity';

@Entity({
  name: 'inventory',
})
export class Inventory extends BaseEntity {
  @Column()
  size: string;

  @Column()
  quantity: number;

  @ManyToOne(() => Product, (product) => product.inventories)
  product: number;
}
