import { BaseEntity } from 'src/base.entity';
import { Column, Entity } from 'typeorm';

@Entity({
  name: 'category',
})
export class Category extends BaseEntity {
  @Column()
  name: string;
}
