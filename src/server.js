const path = require('path')
const Koa = require('koa')
const Router = require('koa-router')
const koaStatic = require('koa-static')
const cors = require('koa-cors');
const koaBody = require('koa-body')

module.exports = function(setting) {
  // 配置信息
  const { port } = setting

  // 本地服务
  const app = new Koa()

  // 静态 demo
  app.use(koaStatic(path.join(__dirname, './static')))

  // cors跨域设置
  app.use(cors());

  // bodyparser
  app.use(koaBody())

  // 接口路由
  const router = new Router()

  // 网站支付相关接口
  require('./api/redirect')(router, setting)
  // 小程序支付相关接口
  require('./api/miniapp')(router, setting)
  // 支付回调相关接口
  require('./api/webhook')(router, setting)

  app
    .use(router.routes())
    .use(router.allowedMethods())

  // 启动服务
  app.listen(port, async () => {
    console.log(`app started at port ${ port }`)
  });
}

