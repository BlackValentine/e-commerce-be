import { BaseEntity } from 'src/base.entity';
import { Column, Entity } from 'typeorm';

@Entity({
  name: 'coffeeQuantity',
})
export class CoffeeQuantityEntity extends BaseEntity {
  @Column()
  size: string;

  @Column()
  quantity: number;
}
