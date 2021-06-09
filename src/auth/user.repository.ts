import { User } from './user.entity';
import { EntityRepository, Repository } from 'typeorm';
import {
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
@EntityRepository(User)
export class UserRepository extends Repository<User> {
  async createUser(userInput: Partial<User>): Promise<void> {
    const { password } = userInput;
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);
    userInput.password = hashedPassword;
    try {
      const user = this.create(userInput);
      await this.save(user);
    } catch (error) {
      if (error.code === '23505') {
        throw new ConflictException('Email already taken by other user');
      } else {
        throw new InternalServerErrorException();
      }
    }
  }
}
