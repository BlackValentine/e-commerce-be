import { BaseEntity } from 'src/base.entity';
import { Column, Entity, ManyToOne } from 'typeorm';
import { CoffeeProductEntity } from './coffeeProduct.entity';

@Entity({
  name: 'coffee_inventory',
})
export class CoffeeInventoryEntity extends BaseEntity {
  @Column()
  size: string;

  @Column()
  quantity: number;

  @ManyToOne(() => CoffeeProductEntity, (product) => product.inventories)
  product: number;
}
