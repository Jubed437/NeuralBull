import IORedis from 'ioredis';

const connection = process.env.REDIS_URL
    ? new IORedis(process.env.REDIS_URL, {
        maxRetriesPerRequest: null
    })
    : new IORedis({
        host: "localhost",
        port: 6379,
        maxRetriesPerRequest: null
    });

connection.on('connect', () => {
    console.log("Redis connected successfully");
})

connection.on('error', (err) => {
    console.log("Redis connection error: ", err);
})

export default connection;