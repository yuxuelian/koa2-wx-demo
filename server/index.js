import Koa from 'koa'
import RedisStore from 'koa-redis'
import consola from 'consola'
import {Nuxt, Builder} from 'nuxt'
// redis session
import session from 'koa-generic-session'
import redisCli from './redis-cli'
// db
import mongoose from 'mongoose'
import dbConfig from './dbs/config'
// 路由 静态资源
import usersRoute from './routes/users'
import indexRoute from './routes'
import koaStatic from 'koa-static'
// json 美化
import json from 'koa-json'
// body解析
import koaBody from 'koa-body'
// Import and Set Nuxt.js options
import config from '../nuxt.config.js'
const app = new Koa()
config.dev = !(app.env === 'production')
app.proxy = true
// json美化插件
app.use(json())
// application/x-www-form-urlencoded application/json解析中间件
app.use(koaBody())
// session
app.keys = ['key', 'keys']
// 使用session中间件,并使用redis存储session
app.use(session({
  store: new RedisStore({
    client: redisCli
  }),
  key: 'SessionId',
  prefix: 'RedisPrefix-',
}))
// 数据库
mongoose.connect(dbConfig.host, {
  useNewUrlParser: true,
})
const connection = mongoose.connection
connection.on('error', function (e) {
})
connection.on('connected', function () {
})
connection.on('open', function (callback) {
})
// 静态资源
app.use(koaStatic(__dirname + '/static'))
// routes 路由中间件需要在最后使用
app.use(indexRoute.routes(), indexRoute.allowedMethods())
app.use(usersRoute.routes(), usersRoute.allowedMethods())

async function start() {
  // Instantiate nuxt.js
  const nuxt = new Nuxt(config)
  const {
    host = process.env.HOST || '127.0.0.1',
    port = process.env.PORT || 3000
  } = nuxt.options.server
  // Build in development
  if (config.dev) {
    const builder = new Builder(nuxt)
    await builder.build()
  } else {
    await nuxt.ready()
  }
  // 这里是返回前端页面的中间件,需要放在最后
  app.use((ctx) => {
    ctx.status = 200
    ctx.respond = false // Bypass Koa's built-in response handling
    ctx.req.ctx = ctx // This might be useful later on, e.g. in nuxtServerInit or with nuxt-stash
    nuxt.render(ctx.req, ctx.res)
  })
  app.listen(port, host)
  consola.ready({
    message: `Server listening on http://${host}:${port}`,
    badge: true
  })
}

start()
