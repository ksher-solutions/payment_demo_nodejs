const miniAppSDK = require('ksher-payment/src/miniapp')
const { getTimestamp } = require('../utils')

module.exports = (router, setting) => {
  // 配置信息
  const {
    token, host,
    mp_alipay_openid,
    mp_alipay_appid,
    mp_wechat_openid,
    mp_wechat_appid,
  } = setting

  // 创建小程序支付SDK实例
  const ksherPaymentMiniAppSDK = new miniAppSDK({ token, host })


  // 支付宝小程序创建订单接口
  router.post('/api/mp-alipay/orderCreate', async (ctx, next) => {
    const {
      note = "some note for this order",
      provider = 'Ksher',
      timestamp = getTimestamp(),
      amount,
      merchant_order_id,
    } = ctx.request.body

    if (!amount || !merchant_order_id) {
      ctx.body = { code: 0, message: '参数不足' }
      return next()
    }

    const data = {
      amount,
      merchant_order_id,
      note,
      provider,
      channel: 'alipay',
      // 此处的 openid 需要通过支付宝小程序授权得到的authCode请求支付宝网关来获取, demo中仅为示例
      miniapp_openid: mp_alipay_openid,
      miniapp_appid: mp_alipay_appid,
      timestamp,
    }

    ctx.body = await ksherPaymentMiniAppSDK.orderCreate(data)
      .then(({ data }) => ({ code: 1, data }))
      .catch(data => {
        console.log('------------------error-----------------------', data);
        return { code: 0, data: { msg: 'error' } }
      })

    return next();
  })
  // 微信小程序创建订单接口
  router.post('/api/mp-wechat/orderCreate', async (ctx, next) => {
    const {
      note = "some note for this order",
      provider = 'Ksher',
      timestamp = getTimestamp(),
      amount,
      merchant_order_id,
    } = ctx.request.body

    if (!amount || !merchant_order_id) {
      ctx.body = { code: 0, message: '参数不足' }
      return next()
    }

    const data = {
      amount,
      merchant_order_id,
      note,
      provider,
      channel: 'wechat',
      // 此处的 openid 需要通过微信小程序login接口得到的code请求微信服务端API来获取, demo中仅为示例
      miniapp_openid: mp_wechat_openid,
      miniapp_appid: mp_wechat_appid,
      timestamp,
    }

    ctx.body = await ksherPaymentMiniAppSDK.orderCreate(data)
      .then(({ data }) => ({ code: 1, data }))
      .catch(data => {
        console.log('------------------error-----------------------', data);
        return { code: 0, data: { msg: 'error' } }
      })

    return next();
  })

  // 支付宝小程序查询订单接口
  router.post('/api/mp-alipay/orderQuery', orderQuery)
  // 微信小程序查询订单接口
  router.post('/api/mp-wechat/orderQuery', orderQuery)

  // 支付宝小程序订单退款接口
  router.post('/api/mp-alipay/orderRefund', orderRefund)
  // 微信小程序订单退款接口
  router.post('/api/mp-wechat/orderRefund', orderRefund)


  async function orderQuery(ctx, next){
    const {
      order_id,
      timestamp = getTimestamp()
    } = ctx.request.body

    if (!order_id) {
      ctx.body = { code: 0, message: '参数不全' }
      return next()
    }

    ctx.body = await ksherPaymentMiniAppSDK.orderQuery(order_id, { timestamp })
      .then(({ data }) => ({ code: 1, data }))
      .catch(data => {
        console.log('------------------error-----------------------', data);
        return { code: 0, data: { msg: 'error' } }
      })

    return next();
  }

  async function orderRefund(ctx, next){
    const {
      order_id,
      refund_order_id = getTimestamp(),
      refund_amount,
      timestamp = getTimestamp()
    } = ctx.request.body

    if (!order_id  || !refund_amount) {
      ctx.body = { code: 0, message: '参数不全' }
      return next()
    }

    const data = {
      refund_amount,
      timestamp,
      refund_order_id,
    }

    ctx.body = await ksherPaymentMiniAppSDK.orderRefund(order_id, data)
      .then(({ data }) => ({ code: 1, data }))
      .catch(data => {
        console.log('------------------error-----------------------', data);
        return { code: 0, data: { msg: 'error' } }
      })

    return next();
  }}
