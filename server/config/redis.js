import IORedis from 'ioredis';

const connection = process.env.REDIS_URL
    ? new IORedis(process.env.REDIS_URL, {
        maxRetriesPerRequest: null,
        enableReadyCheck: false,
        enableOfflineQueue: true,
        retryStrategy: (times) => {
            const delay = Math.min(times * 50, 2000);
            return delay;
        }
    })
    : new IORedis({
        host: "localhost",
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