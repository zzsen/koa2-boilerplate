'use strict'
import debug from 'debug'

export default function checkauth () {
  return async function (ctx, next) {
    debug('koa2:isAuthenticated')(ctx.isAuthenticated())
    if (ctx.isAuthenticated() ||
      ctx.path.indexOf('/auth/') >= 0 ||
      ctx.path.indexOf('/open/') >= 0 ||
      ctx.path === '/' ||
      ctx.path.indexOf('.html') >= 0) {
      await next()
    } else {
      ctx.body = {
        'status': 401,
        'message': 'please login'
      }
    }
  }
}
