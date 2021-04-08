import { registerAs } from '@nestjs/config';

export default registerAs('cache', () => ({
  store: process.env.CACHE_STORE,
  host: process.env.CACHE_HOST,
  port: parseInt(process.env.CACHE_PORT, 10),
  ttl: parseInt(process.env.CACHE_TTL, 10),
}));