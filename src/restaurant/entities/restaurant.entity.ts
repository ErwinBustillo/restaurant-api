import { User } from '../../auth/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  OneToOne,
  JoinColumn,
} from 'typeorm';
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

  @OneToOne((type) => User, { nullable: true })
  @JoinColumn({ referencedColumnName: 'id', name: 'owner_id' })
  owner: User;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
