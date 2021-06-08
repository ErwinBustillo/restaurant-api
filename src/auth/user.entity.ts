import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Gender } from './enums/gender.enum';
@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'first_name' })
  firstName: string;

  @Column({ name: 'last_name' })
  lastName: string;

  @Column({
    type: 'enum',
    enum: Gender,
    name: 'gender',
    default: Gender.OTHER,
  })
  gender: Gender;

  @Column({ unique: true, name: 'email' })
  email: string;

  @Column({ select: false, name: 'password' })
  password: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
