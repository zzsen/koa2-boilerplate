'use strict'
import path from 'path'
import _ from 'lodash'
import debug from 'debug'

const env = process.env.NODE_ENV = process.env.NODE_ENV.trim() || 'development'
let base = {
  app: {
    root: path.normalize(path.join(__dirname, '/..')),
    env
  }
}

let specific = {
  development: {
    app: {
      port: 5000,
      name: 'koa2-boilerplate - Dev',
      excluded: 'excluded_path'
    },
    mysql: {
      host: 'localhost',
      dialect: 'mysql',
      database: 'test',
      username: '123',
      password: '123'
    }
  },
  production: {
    app: {
      port: process.env.PORT || 5000,
      name: 'koa2-boilerplate',
      excluded: 'excluded_path'
    },
    mysql: {
      host: 'localhost',
      port: 3306,
      user: 'test',
      password: 'test',
      database: 'test'
    }
  }
}
debug('koa2:config')(_.merge(base, specific[env]))
module.exports = _.merge(base, specific[env])
