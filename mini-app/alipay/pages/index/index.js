Page({
  data: {
    // 创建订单
    amount: 0,
    merchant_order_id: null,

    // 查询订单
    query_order_id: null,

    // 退款订单
    refund_order_id: null,
    refund_amount: 0
  },

  onShow() {
    this.setData({
      merchant_order_id: +new Date() + ''
    })
  },

  onInput(e) {
    const { key } = e.target.dataset
    this.setData({ [key]: e.detail.value })
  },

  // 创建订单
  createOrder() {
    const { amount, merchant_order_id } = this.data
    my.request({
      url: 'http://localhost:3000/api/mp-alipay/orderCreate',
      method: 'POST',
      data: { amount, merchant_order_id },
      success(res) {
        if (res.data && res.data.code === 1) {
          console.log('发起支付');
          let { reference } = res.data.data
          my.tradePay({ orderStr: reference })
        } else {
          console.error('请求失败', res);
        }
      },
      fail(err) {
        console.error('fail', err);
      }
    })
  },

  // 查询订单
  queryOrder() {
    const order_id = this.data.query_order_id
    my.request({
      url: 'http://localhost:3000/api/mp-alipay/orderQuery',
      method: 'POST',
      data: { order_id },
      success(res) {
        if (res.data && res.data.code === 1) {
          my.alert({
            title: '订单信息',
            content: JSON.stringify(res.data.data, null, ' ')
          })
          console.log('------------------订单详情:-----------------------');
          console.log(res.data.data);
        } else {
          console.error('请求失败', res);
        }
      },
      fail(err) {
        console.error('fail', err);
      }
    })
  },

  // 订单退款
  refundOrder() {
    const order_id = this.data.refund_order_id;
    const refund_amount = this.data.refund_amount;
    my.request({
      url: 'http://localhost:3000/api/mp-alipay/orderRefund',
      method: 'POST',
      data: { order_id, refund_amount },
      success(res) {
        if (res.data && res.data.code === 1) {
          my.alert({
            title: '订单信息',
            content: JSON.stringify(res.data.data, null, ' ')
          })
          console.log('------------------订单详情:-----------------------');
          console.log(res.data.data);
        } else {
          console.error('请求失败', res);
        }
      },
      fail(err) {
        console.error('fail', err);
      }
    })

  }
});
