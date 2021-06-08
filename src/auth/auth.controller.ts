import { Body, Controller, Post, HttpCode } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDTO } from './dtos/login.dto';
import { RegisterDTO } from './dtos/register.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  login(@Body() loginParams: LoginDTO) {
    return this.authService.login(loginParams);
  }

  @Post('register')
  register(@Body() registerParams: RegisterDTO) {
    return this.authService.register(registerParams);
  }
}
