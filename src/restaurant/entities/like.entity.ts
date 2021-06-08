import { User } from '../../auth/user.entity';
import { Restaurant } from './restaurant.entity';
import { Entity, OneToOne, JoinColumn, PrimaryGeneratedColumn } from 'typeorm';
@Entity()
export class Like {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @OneToOne((type) => User, { nullable: false })
  @JoinColumn({ referencedColumnName: 'id', name: 'user_id' })
  user: User;

  @OneToOne((type) => Restaurant, { nullable: false })
  @JoinColumn({ referencedColumnName: 'id', name: 'restaurant_id' })
  restaurant: Restaurant;
}
