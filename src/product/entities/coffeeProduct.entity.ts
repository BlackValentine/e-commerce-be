import { BaseEntity } from 'src/base.entity';
import { Column, Entity, OneToMany } from 'typeorm';
import { CoffeeInventoryEntity } from './coffeeInventory.entity';

@Entity({
  name: 'coffee_product',
})
export class CoffeeProductEntity extends BaseEntity {
  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  roast: string;

  @Column()
  origin: string;

  @Column()
  taste: string;

  @Column()
  price: number;

  @Column()
  category_id: number;

  @OneToMany(() => CoffeeInventoryEntity, (inventory) => inventory.product)
  inventories: CoffeeInventoryEntity[];
}
