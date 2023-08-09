import { BaseEntity } from 'src/base.entity';
import { Column, Entity } from 'typeorm';

@Entity({
  name: 'coffeeProduct',
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
}
