import { BaseEntity } from "src/base.entity";
import { Column, Entity } from "typeorm";

@Entity({
  name: 'product'
})
export class ProductEntity extends BaseEntity {
  @Column()
  name: string;

  @Column()
  price: number;
}