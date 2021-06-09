import { Body, Controller, Post, HttpCode } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDTO } from './dtos/login.dto';
import { RegisterDTO } from './dtos/register.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @HttpCode(200)
  login(@Body() loginParams: LoginDTO) {
    return this.authService.login(loginParams);
  }

  @Post('register')
  @HttpCode(201)
  register(@Body() registerParams: RegisterDTO) {
    return this.authService.register(registerParams);
  }
}
