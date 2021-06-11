Page({
  data: {
    // 创建订单
    amount: 100,
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
    wx.request({
      url: 'http://localhost:3000/api/mp-wechat/orderCreate',
      method: 'POST',
      data: { amount, merchant_order_id },
      success(res) {
        if (res.data && res.data.code === 1) {
          console.log('发起支付');
          let {
            reference,
            paySign,
            signType,
            timestamp: timeStamp,
            nonceStr
          } = res.data.data
          // 将支付网关的返回信息拼成支付信息
          const payData = {
            timeStamp,
            nonceStr,
            package: `prepay_id=${ reference }`,
            signType,
            paySign,
          }
          console.log(payData);
          wx.requestPayment({
            ...payData,
            success: res => {
              console.log(res);
            },
            fail: res => {
              console.log(res);
            }
          })
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
    wx.request({
      url: 'http://localhost:3000/api/mp-wechat/orderQuery',
      method: 'POST',
      data: { order_id },
      success(res) {
        if (res.data && res.data.code === 1) {
          wx.showModal({
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
    wx.request({
      url: 'http://localhost:3000/api/mp-wechat/orderRefund',
      method: 'POST',
      data: { order_id, refund_amount },
      success(res) {
        if (res.data && res.data.code === 1) {
          wx.alert({
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
