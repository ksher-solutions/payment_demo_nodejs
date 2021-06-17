const PaySDK = require('ksher-payment')
const { getTimestamp} = require('../utils')

module.exports = (router, setting) => {
  // 配置信息
  const {
    token,
    host,
    redirect_url: $redirect_url = 'http://www.baidu.com',
    redirect_url_fail: $redirect_url_fail = 'http://www.baidu.com'
  }  = setting



  // 创建订单接口
  router.post('/api/orderCreate', async (ctx, next) => {
    const {
      note = "some note for this order",
      provider = 'Ksher',
      redirect_url = $redirect_url,
      redirect_url_fail = $redirect_url_fail,
      timestamp = getTimestamp(),
      setting = { token, host },
      amount,
      merchant_order_id,
    } = ctx.request.body

    if (!amount || !merchant_order_id) {
      ctx.body = { code: 0, message: '参数不足' }
      return next()
    }

    const data = { note, provider, redirect_url, redirect_url_fail, timestamp, amount, merchant_order_id }
    // sdk 初始化
    const ksherPaymentSDK = new PaySDK(setting);

    ctx.body = await ksherPaymentSDK.orderCreate(data)
      .then(({ data }) => ({ code: 1, data }))
      .catch(data => {
        console.log('------------------error-----------------------', data);
        return { code: 0, data: { msg: 'error' } }
      })

    return next();
  })

  // 查询订单接口
  router.post('/api/orderQuery', async (ctx, next) => {
    const {
      order_id,
      setting = { token, host },
      timestamp = getTimestamp()
    } = ctx.request.body

    if (!order_id) {
      ctx.body = { code: 0, message: '参数不全' }
      return next()
    }
    // sdk 初始化
    const ksherPaymentSDK = new PaySDK(setting);

    ctx.body = await ksherPaymentSDK.orderQuery(order_id, { timestamp })
      .then(({ data }) => ({ code: 1, data }))
      .catch(data => {
        console.log('------------------error-----------------------', data);
        return { code: 0, data: { msg: 'error' } }
      })

    return next();
  })

  // 订单退款接口
  router.post('/api/orderRefund', async (ctx, next) => {
    const {
      order_id,
      refund_amount,
      setting = { token, host },
      timestamp = getTimestamp(),
      refund_order_id = getTimestamp(),
    } = ctx.request.body
    if (!order_id || !refund_amount) {
      ctx.body = { code: 0, message: '参数不全' }
      return next()
    }

    const data = {
      refund_amount,
      timestamp,
      refund_order_id,
    }
    // sdk 初始化
    const ksherPaymentSDK = new PaySDK(setting);

    console.log({ order_id, data });
    ctx.body = await ksherPaymentSDK.orderRefund(order_id, data)
      .then(({ data }) => ({ code: 1, data }))
      .catch(data => {
        console.log('------------------error-----------------------', data);
        return { code: 0, data: { msg: 'error' } }
      })

    return next();
  })

  // todo 取消订单接口 暂未支持

}
