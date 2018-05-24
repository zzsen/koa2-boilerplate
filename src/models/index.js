
'use strict'

import { mysql } from '../config/config'
import debug from 'debug'
import fs from 'fs'
import path from 'path'
import Sequelize from 'sequelize'
var basename = path.basename(__filename)
var db = {}
debug('koa2:modelConfig')(mysql)
var sequelize = new Sequelize(mysql.database, mysql.username, mysql.password, {
  host: mysql.host,
  dialect: mysql.dialect,
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
})

// 测试连接
// sequelize
//   .authenticate()
//   .then(() => {
//     console.log('Connection has been established successfully.')
//   })
//   .catch(err => {
//     console.error('Unable to connect to the database:', err)
//   })

fs
  .readdirSync(__dirname)
  .filter(file => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js')
  })
  .forEach(file => {
    var fileContent = require(path.join(__dirname, file))
    var fileName = file.slice(0, file.lastIndexOf('.js'))
    fileName = fileName.substring(0, 1).toUpperCase() + fileName.substring(1)

    // 添加和文件名一样的sequelize对象
    db[fileName] = sequelize.import(fileName, fileContent[fileName])
    // 遍历文件内的属性
    for (var key in fileContent) {
      // 添加和文件名不一样的class对象
      // 注意：这里要判断属性名和文件名不一致，免得把上面添加了的属性覆盖掉
      if (key !== fileName) {
        db[key] = fileContent[key]
      }
    }
    debug('koa2:modelDB')(db)
  })

db['User'].hasMany(db['Book'], {
  foreignKey: 'publishor_id',
  constraints: false,
  otherKey: 'id'
})
/*
user.getBooks().then(books => {
  debug('koa2:book')(books)
}).catch(err => {
  debug('koa2:bookerr')(err)
})
*/
// 获取原生sql的方法
// debug('koa2:a')(User.sequelize.dialect.QueryGenerator.selectQuery(User.getTableName(), { where: { id: 1 } }))
db.sequelize = sequelize
db.Sequelize = Sequelize

module.exports = db
