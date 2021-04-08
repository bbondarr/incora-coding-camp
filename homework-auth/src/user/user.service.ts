import { Injectable, UseGuards } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { LocalStrategy } from '../auth/strategies/local.strategy';
import { SignUpDto } from '../auth/dto/signUpDto';

@Injectable()
export class UserService {
  constructor(@InjectRepository(User) private userRepo: Repository<User>) {}

  async findAll(): Promise<User[]> {
    return this.userRepo.find();
  }

  async findByEmail(email: string): Promise<User | undefined> {
    return this.userRepo.findOne({ email });
  }

  async create(signUpDto: SignUpDto): Promise<User> {
    let newObj = this.userRepo.create(signUpDto);
    newObj = await this.userRepo.save(newObj);

    return newObj;
  }
}
