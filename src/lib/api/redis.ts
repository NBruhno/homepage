import { Redis } from 'ioredis'

import { config } from 'config.server'

export const redis = new Redis(config.redis.url)
