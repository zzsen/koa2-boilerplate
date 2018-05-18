'use strict'

import Router from 'koa-router'
import passport from 'koa-passport'
import debug from 'debug'

const router = new Router()

router.get('/login', async (ctx, next) => {
  ctx.body = {
    'status': 'login page'
  }
})

router.post('/login', async (ctx, next) => {
  let middleware = passport.authenticate('local', async (user, info) => {
    debug('koa2:auth')(user)
    if (user === false) {
      ctx.body = {
        'status': 400
      }
    } else {
      await ctx.login(user)
      ctx.body = {
        user: user
      }
    }
  })
  await middleware.call(this, ctx, next)
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
