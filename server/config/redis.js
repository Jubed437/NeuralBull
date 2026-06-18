import IORedis from 'ioredis';

const isRemoteRedis = Boolean(process.env.REDIS_URL && !process.env.REDIS_URL.includes('localhost'));
const redisUrl = isRemoteRedis
    ? process.env.REDIS_URL.replace(/^redis:\/\//, 'rediss://')
    : process.env.REDIS_URL;

const connection = redisUrl
    ? new IORedis(redisUrl, {
        maxRetriesPerRequest: null,
        enableReadyCheck: false,
        enableOfflineQueue: true,
        tls: isRemoteRedis ? {} : undefined,
        retryStrategy: (times) => {
            const delay = Math.min(times * 50, 2000);
            return delay;
        }
    })
    : new IORedis({
        host: 'localhost',
        port: 6379,
        maxRetriesPerRequest: null
    });

connection.on('connect', () => {
    console.log("✓ Redis connected successfully");
})

connection.on('error', (err) => {
    console.log("✗ Redis connection error: ", err.message);
})

connection.on('reconnecting', () => {
    console.log("↻ Redis reconnecting...");
});

connection.on('close', () => {
    console.log("✗ Redis connection closed");
});

export default connection;