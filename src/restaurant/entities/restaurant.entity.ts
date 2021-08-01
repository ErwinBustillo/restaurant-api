import { User } from '../../auth/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  OneToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { Vote } from './vote.entity';
@Entity()
export class Restaurant {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'name' })
  name: string;

  @Column({ name: 'address' })
  address: string;

  @Column({ name: 'phone' })
  phone: string;

  @Column({ length: 10, name: 'zip_code' })
  zipCode: string;

  @Column({ name: 'is_public' })
  isPublic: boolean;

  @Column({ name: 'owner_id', nullable: true, unique: false })
  ownerId: string;

  @OneToOne((type) => User, { nullable: true })
  @JoinColumn({ name: 'owner_id' })
  owner: User;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
