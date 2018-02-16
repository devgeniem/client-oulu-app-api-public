/* const bluebird = require('bluebird');
const redis = require('redis');

bluebird.promisifyAll(redis.RedisClient.prototype);
bluebird.promisifyAll(redis.Multi.prototype);
const redisClient = redis.createClient({ host: process.env.REDIS_HOST, port: process.env.REDIS_PORT, password: process.env.REDIS_PASSWORD });
const redisCache = {
  set(key, value, paramkey, paramvalue) {
    if (paramkey && paramvalue) {
      redisClient.set(key, JSON.stringify(value), paramkey, paramvalue);
    } else {
      redisClient.set(key, JSON.stringify(value));
    }
  },
  setHash(key, hkey, value) {
    redisClient.hset(key, hkey, JSON.stringify(value));
  },
  async get(key) {
    const value = await redisClient.getAsync(key);
    return JSON.parse(value);
  },
  async hget(k, h) {
    const value = await redisClient.hgetAsync(k, h);
    return JSON.parse(value);
  },
};

module.exports = redisCache;
*/
