
'use strict'
// user的sequelize模型
let User = (sequelize, DataTypes) => {
  const User = sequelize.define('user', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    account: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false
    },
    username: {
      type: DataTypes.STRING
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    tableName: 'user',
    timestamps: true, // 添加时间戳属性 (updatedAt, createdAt)
    paranoid: true// 不删除数据库条目，但将新添加的属性deletedAt设置为当前日期
  }
  )
  return User
}

// user的实例对象
let UserClass = class User {
  constructor (data) {
    if (data) {
      this.id = data.id
      this.account = data.account
      this.username = data.username
    }
  }
}

module.exports = {
  User,
  UserClass
}
