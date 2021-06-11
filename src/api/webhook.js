module.exports = (router, setting) => {
  // 成功回调
  router.get('/api/redirect/success', async (ctx, next) => {
    console.log('------------------get success callback-----------------------');
    console.log(ctx.query);
    console.log(ctx.request.body);
    ctx.body = ctx.request.body
    return next()
  })

  // 失败回调
  router.get('/api/redirect/fail', async (ctx, next) => {
    console.log('------------------get fail callback-----------------------');
    console.log(ctx.query);
    console.log(ctx.request.body);
    ctx.body = ctx.request.body
    return next()
  })

  // 成功回调
  router.post('/api/redirect/success', async (ctx, next) => {
    console.log('------------------post success callback-----------------------');
    console.log(ctx.query);
    console.log(ctx.request.body);
    ctx.body = ctx.request.body
    return next()
  })

  // 失败回调
  router.post('/api/redirect/fail', async (ctx, next) => {
    console.log('------------------post fail callback-----------------------');
    console.log(ctx.query);
    console.log(ctx.request.body);
    ctx.body = ctx.request.body
    return next()
  })

}
