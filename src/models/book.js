
'use strict'
// book的sequelize模型
let Book = (sequelize, DataTypes) => {
  const Book = sequelize.define('book', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    publishor_id: {
      type: DataTypes.STRING
    }
  }, {
    tableName: 'book',
    timestamps: true, // 添加时间戳属性 (updatedAt, createdAt)
    paranoid: true// 不删除数据库条目，但将新添加的属性deletedAt设置为当前日期
  }
  )
  return Book
}

// book的实例对象
let BookClass = class Book {
  constructor (data) {
    if (data) {
      this.id = data.id
      this.name = data.name
      this.publishor_id = data.publishor_id
    }
  }
}

module.exports = {
  Book,
  BookClass
}
