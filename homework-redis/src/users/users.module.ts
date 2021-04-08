import { CacheModule, CacheModuleOptions, Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as redisStore from 'cache-manager-redis-store';
import { User } from './entities/user.entity';
import { ConfigModule, ConfigService } from '@nestjs/config';
import redisConfig from 'src/config/redis.config';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    ConfigModule.forFeature(redisConfig),
    CacheModule.register({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        ...(configService.get('cache') as CacheModuleOptions),
      }),
    }),],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
