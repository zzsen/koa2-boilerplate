'use strict'

import passport from 'koa-passport'
import { GetUser, Verify } from '../modelService/userService'
import { UserClass } from '../models'

passport.serializeUser(function (user, done) {
  done(null, user.id)
})

passport.deserializeUser(function (id, done) {
  GetUser(id).then(u => {
    if (u) { done(null, u) } else { done('无效的用户信息', u) }
  })
})

var LocalStrategy = require('passport-local').Strategy

passport.use(new LocalStrategy(function (username, password, done) {
  Verify(username).then(u => {
    if (u && u.password === password) {
      u = new UserClass(u)
      done(null, u)
    } else {
      done(null, false)
    }
  })
    .catch(err => {
      done(err, false)
    })
}))
