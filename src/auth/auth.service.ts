import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { LoginDTO } from './dtos/login.dto';
import { RegisterDTO } from './dtos/register.dto';
import { UserRepository } from './user.repository';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './interfaces/jwt-payload.interface';
@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserRepository)
    private readonly userRepository: UserRepository,
    private jwtService: JwtService,
  ) {}

  async login(payload: LoginDTO) {
    const { email, password } = payload;
    const user = await this.userRepository.findOne({ email });
    const isValid = await bcrypt.compare(password, user.password);
    if (user && isValid) {
      const payload: JwtPayload = { userId: user.id };
      return {
        authToken: this.jwtService.sign(payload),
      };
    } else {
      throw new UnauthorizedException('Invalid creedentials');
    }
  }

  register(payload: RegisterDTO) {
    return this.userRepository.createUser(payload);
  }
}
