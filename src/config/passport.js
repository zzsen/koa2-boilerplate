'use strict'

import passport from 'koa-passport'
import { GetUser, Verify } from '../modelService/userService'
import { UserClass } from '../models'

passport.serializeUser(function (user, done) {
  done(null, user.id)
})

passport.deserializeUser(function (id, done) {
  GetUser(id)
    .then(u => {
      if (u) { done(null, u) } else { done(null, false, { message: 'Incorrect username' }) }
    })
    .catch(err => { done(err, null) })
})

var LocalStrategy = require('passport-local').Strategy

passport.use(new LocalStrategy(function (username, password, done) {
  Verify(username).then(u => {
    if (u && u.password === password) {
      u = new UserClass(u)
      done(null, u)
    } else {
      done(null, false, { message: 'Incorrect password.' })
    }
  })
    .catch(err => {
      done(err, false)
    })
}))
