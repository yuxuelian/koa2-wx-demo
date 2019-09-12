import Redis from 'ioredis'
const redisCli = new Redis({
  port: 6379, // Redis port
  host: "118.126.108.24", // Redis host
  family: 4, // 4 (IPv4) or 6 (IPv6)
  password: "Yuxuelian-520",
  db: 3,
  maxRetriesPerRequest: 1,
  // 离线时队列
  enableOfflineQueue: true,
  retryStrategy: function (times) {
    return Math.min(times * 50, 2000)
  },
  reconnectOnError: function (err) {
    const targetError = "READONLY"
    if (err.message.slice(0, targetError.length) === targetError) {
      return true
    }
  }
})
// 测试写入
redisCli.set('redis-test', new Date(), 'EX', 86400)
export default redisCli
