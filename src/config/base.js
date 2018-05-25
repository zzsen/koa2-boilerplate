'use strict'

import compose from 'koa-compose'
import convert from 'koa-convert'
import cors from 'kcors'
import Serve from 'koa-static'
import Logger from 'koa-logger'
import mount from 'koa-mount'
import bodyParser from 'koa-bodyparser'
import session from 'koa-generic-session'
import views from 'koa-views'

import koaBody from 'koa-body'
import fs from 'fs'
import os from 'os'
import path from 'path'

import _ from './passport'
import passport from 'koa-passport'

import log4js from 'log4js'

export default function middleware (app) {
  app.proxy = true

  log4js.configure({
    appenders: [
      { type: 'console' },
      { type: 'dateFile', filename: path.join(__dirname, '/../tmp/boilerplate.log'), 'pattern': '-yyyy-MM-dd-hh.log', 'alwaysIncludePattern': false, category: 'file' }
    ],
    replaceConsole: true
  })

  app.use(koaBody({ multipart: true }))
  app.use(cors({ credentials: true }))
  app.use(convert(Logger()))
  app.use(bodyParser())
  app.use(mount('/', convert(Serve(path.join(__dirname, '../public/')))))

  app.use(async function (ctx, next) {
    // ignore non-POSTs
    if (ctx.method !== 'POST') {
      await next()
      return
    }
    if (!ctx.request.body.files) {
      await next()
      return
    }
    const file = ctx.request.body.files.file
    if (!file) {
      await next()
    } else {
      const reader = fs.createReadStream(file.path)
      const stream = fs.createWriteStream(path.join(os.tmpdir(), Math.random().toString()))
      reader.pipe(stream)
      console.log('uploading %s -> %s', file.name, stream.path)

      await next()
    }
  })

  app.keys = ['superalsrk-session-key']
  app.use(convert(session({
    key: 'koa:sess', /** (string) cookie key (default is koa:sess) */
    cookie: {
      path: '/',
      httpOnly: false,
      maxAge: 10 * 1000,
      rewrite: true,
      signed: true
    }
  })))

  app.use(passport.initialize())
  app.use(passport.session())

  app.use(views(path.join(__dirname, '../views'), { extension: 'swig' }))
}
