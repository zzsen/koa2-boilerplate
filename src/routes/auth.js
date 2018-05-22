'use strict'

import Router from 'koa-router'
import passport from 'koa-passport'

const router = new Router()

router.post('/login', async (ctx, next) => {
  if (ctx.isAuthenticated()) {
    ctx.body = { user: ctx.req.user, message: '已经登录了' }
    next()
  } else {
    let middleware = passport.authenticate('local', async (user, info) => {
      if (user === false) {
        ctx.body = {
          'status': 400,
          'message': info.message
        }
      } else {
        // user信息会存在ctx.req.user
        await ctx.login(user)
        ctx.body = {
          user: user
        }
      }
    })
    await middleware.call(this, ctx, next)
  }
})

router.get('/logout', async (ctx, newt) => {
  ctx.logout()
  ctx.redirect('/')
})

router.get('/status', async (ctx, next) => {
  ctx.body = {
    'isLogin': ctx.isAuthenticated()
  }
})

export default router
