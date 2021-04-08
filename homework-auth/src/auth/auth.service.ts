import { HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { hash, compare } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import { SignUpDto } from './dto/signUpDto';
import { User } from 'src/user/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.userService.findByEmail(email);

    if (user && (await compare(pass, user.password))) {
      const { password, ...result } = user;
      return result;
    }

    return null;
  }

  signIn(user: any) {
    const payload = { email: user.email, sub: user.id };
    return { access_token: this.jwtService.sign(payload) };
  }

  async signUp(signUpDto: SignUpDto) {
    const isDuplicateEmail = await this.userService.findByEmail(
      signUpDto.email,
    );
    if (isDuplicateEmail) {
      throw new UnauthorizedException('User with this email already exists');
    }

    signUpDto.password = await hash(signUpDto.password, Math.random());
    const user: User = await this.userService.create(signUpDto);

    return {
      status: HttpStatus.CREATED,
      profile: {
        id: user.id,
        username: user.username,
        email: user.email,
        timestamp: new Date().toISOString(),
      },
    };
  }
}
