import { BaseEntity } from 'src/base.entity';
import { Column, Entity, OneToMany } from 'typeorm';
import { Inventory } from './inventory.entity';

@Entity({
  name: 'product',
})
export class Product extends BaseEntity {
  @Column()
  name: string;

  @Column('text')
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
  image: string;

  @Column()
  categoryId: number;

  @OneToMany(() => Inventory, (inventory) => inventory.product)
  inventories: Inventory[];
}
