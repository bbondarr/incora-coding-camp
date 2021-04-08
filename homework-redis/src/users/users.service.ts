import { CACHE_MANAGER, Inject, Injectable } from '@nestjs/common';
import { Cache } from 'cache-manager';
import * as redis from 'redis';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

const genId = () => '_' + Math.random().toString(36).substr(2, 9);

@Injectable()
export class UsersService {
  constructor(
    @Inject(CACHE_MANAGER)
    private cacheManager: Cache,
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<{ key: string }> {
    const id = genId();
    await this.cacheManager.set(id, createUserDto, { ttl: 1000000 });
    
    return { key: id };
  }

  async findAll(): Promise<User[]> {
    const keys = await this.cacheManager.store.keys();
    const results = this.cacheManager.store.mget(...keys)

    return results;
  }

  async findOne(id: string): Promise<User> {
    return await this.cacheManager.get(id);
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    return await this.cacheManager.set(id, updateUserDto, { ttl: 1000000 });
  }

  async remove(id: string): Promise<any> {
    return await this.cacheManager.del(id);
  }

  async cloneCacheToDb(): Promise<any> {
    const keys = await this.cacheManager.store.keys();
    const users: User[] = await this.cacheManager.store.mget(...keys)

    const usersToSave = this.usersRepository.create(users);
    await this.usersRepository.save(usersToSave);
  }

  async cloneDbToCache(): Promise<User[]> {
    const users = await this.usersRepository.find();
    const usersWithKeys = [];
    users.forEach(user => usersWithKeys[genId()] = user);

    return this.cacheManager.store.mset(...usersWithKeys);
  }
}
