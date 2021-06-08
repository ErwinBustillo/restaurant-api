import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { LoginDTO } from './dtos/login.dto';
import { RegisterDTO } from './dtos/register.dto';
import { UserRepository } from './user.repository';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserRepository)
    private readonly userRepository: UserRepository,
  ) {}

  login(payload: LoginDTO) {
    return {};
  }

  register(payload: RegisterDTO) {
    return {};
  }
}
