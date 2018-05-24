'use strict'

import Router from 'koa-router'
import passport from 'koa-passport'
import debug from 'debug'
import { UserClass } from '../models'
import { Register } from '../modelService/userService'
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
        user = new UserClass(user)
        await ctx.login(user)
        ctx.body = {
          user: user
        }
      }
    })
    await middleware.call(this, ctx, next)
  }
})

router.get('/logout', async (ctx, next) => {
  ctx.logout()
  ctx.redirect('/')
})

router.post('/register', async (ctx, next) => {
  if (ctx.isAuthenticated()) {
    ctx.body = { user: ctx.req.user, message: '已经登录了' }
    next()
  }
  let account = ctx.request.body.account
  let password = ctx.request.body.password
  await Register(account, password).then(result => {
    if (result.created) {
      ctx.body = {
        user: new UserClass(result.user),
        message: 'register successfully'
      }
    } else {
      ctx.body = {
        message: '该用户已存在'
      }
    }
  })
})

router.get('/status', async (ctx, next) => {
  ctx.body = {
    'isLogin': ctx.isAuthenticated()
  }
})

export default router
