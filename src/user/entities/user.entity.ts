import { Exclude } from 'class-transformer';
import { BaseEntity } from 'src/base.entity';
import { Entity, Column } from 'typeorm';

@Entity({
  name: 'user',
})
export class User extends BaseEntity {
  @Column()
  userName: string;

  @Column()
  email: string;

  @Column()
  @Exclude()
  password: string;

  @Column({ default: false })
  isActive: boolean;

  @Column({ default: null })
  refreshToken: string;

  @Column()
  public stripeCustomerId: string;
}
