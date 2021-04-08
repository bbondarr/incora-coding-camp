import { Controller, Post, UseGuards, Request, Get } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  
  @UseGuards(AuthGuard('local'))
  @Post('/signin')
  signIn(@Request() req) {
    return this.authService.signIn(req.user);
  }

  @Post('/signup')
  signUp(@Request() req) {
    return this.authService.signUp(req.body);
  }
}
