import { Controller, Get, UseGuards } from '@nestjs/common';
import { User } from './user.entity';
import { UserService } from './user.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  // Route to test jwt guards
  @UseGuards(AuthGuard('jwt'))
  @Get()
  async getAll(): Promise<User[]> {
      return await this.userService.findAll();
  }
}
