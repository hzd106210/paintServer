/*
 * @Author: HuangZhaoda
 * @Date: 2020-10-30 16:10:28
 * @Last Modified by: HuangZhaoda
 * @Last Modified time: 2020-11-03 17:11:26
 * @Desc 订单-货品
 */

const db = require('./db')
const mysql = require('mysql')

const sql = {
  create:
    'create table if not exists  bill_goods(id int not null,name varchar(50),unit varchar(20) not null,' +
    'img varchar(50), in_stock_price varchar(50) not null, sale_price varchar(50) not null,' +
    'specifications varchar(50),number int not null,delivery_number int not null,' +
    'primary key(id))',
  insert:
    'insert into bill_goods(unit,img,in_stock_price,sale_price,specifications,number,delivery_number)' +
    ' values (?,?,?,?,?,?,?)',
  updateDeliveryNumber:
    'update bill_goods set delivery_number=? where id=? and bill_id=?'
}
const methods = {
  // 创建表
  create: (callback) => {
    db.query(sql.create, (error) => {
      console.log(
        `创建bill_goods表${error ? `失败：${error.message}❎` : '成功 ✔'}`
      )
      callback && callback(error)
    })
  },
  // 插入数据
  insert: (param = {}, callback) => {
    db.query(sql.insert, {}, callback)
  },
  // 根据id修改发货数量
  updateDeliveryNumber: (param = [], callback) => {
    // 拼接update语句
    const sql = param
      .map((item) => {
        return mysql.format(sql.updateDeliveryNumber, [
          item.delivery_number,
          item.id,
          item.bill_id
        ])
      })
      .join(';')
    db.query(sql, callback)
  }
}
module.exports = methods
