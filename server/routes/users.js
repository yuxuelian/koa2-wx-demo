// 用户 model
import Users from '../dbs/models/users'
// redis
import redisCli from '../redis-cli'
// 路由
import Router from 'koa-router'
const users = Router({
  prefix: '/users'
})
// 测试接口
users.get('/json', async (ctx) => {
  ctx.cookies.set('pvid', Math.random())
  ctx.session.jsonCount++
  ctx.body = {
    title: '测试 json 接口'
  }
})
export default users
