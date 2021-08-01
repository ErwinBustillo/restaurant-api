import { User } from '../../auth/user.entity';
import { Restaurant } from './restaurant.entity';
import {
  Entity,
  OneToOne,
  JoinColumn,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
@Entity()
export class Vote {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'user_id', nullable: false })
  userId: string;

  @Column({ name: 'restaurant_id', nullable: false })
  restaurantId: string;

  @OneToOne((type) => User, { nullable: false })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @OneToOne((type) => Restaurant, { nullable: false, eager: true })
  @JoinColumn({ name: 'restaurant_id' })
  restaurant: Restaurant;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
