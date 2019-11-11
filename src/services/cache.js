import Redis from 'ioredis';

const cache = new Redis({
  port: process.env.REDIS_PORT, // Redis port
  host: process.env.REDIS_HOST, // Redis host
  db: process.env.REDIS_DB, // Redis db
  password: process.env.REDIS_PASS // Redis password
});

export default cache;
