/*
 * @Author: HuangZhaoda
 * @Date: 2020-10-30 13:58:15
 * @Last Modified by: HuangZhaoda
 * @Last Modified time: 2020-11-03 17:31:43
 * @desc 单据
 */

const db = require('./db')

/**
 * 订单状态
 * status: 1:已送达，0:已完成，2:已付款，-1:欠货，-2:欠钱
 */
const sql = {
  create:
    'create table if not exists bill(id int auto_increment not null,create_date date not null' +
    ',order_number varchar(30) not null,delivery_time date not null,' +
    'goods varchar(50) not null,total_price varchar(20) not null,' +
    'real_price varchar(20) not null,discount_price varchar(20) not null,' +
    'arrears varchar(20) not null,creator varchar(30) not null,' +
    'update_date date,update_by varchar(30),status int not null,primary key(id))',
  insert:
    'insert in to bill(auto_increment,create_date,order_number,delivery_time,' +
    'goods,total_price,real_price,discount_price,arrears,creator,status)' +
    ' values(?,?,?,?,?,?,?,?,?,?,?)',
  updateById:
    'update bill set create_date=?,order_number=?,delivery_time=?,goods=?,' +
    'total_price=?,real_price=?,discount_price=?,arrears=?,creator=?,' +
    'update_date=?,update_by=?,status=? where id=?',
  updateStatusById:
    'update bill set status=?,update_date=?,update_by=? where id=?'
}

const methods = {
  // 创建表
  create: (callback) => {
    db.query(sql.create, (error) => {
      console.log(`创建bill表${error ? `失败：${error.message}❎` : '成功 ✔'}`)
      callback && callback(error)
    })
  },
  // 插入数据
  insert: (param = {}, callback) => {
    const {
      auto_increment,
      create_date,
      order_number,
      delivery_time,
      goods,
      total_price,
      real_price,
      discount_price,
      arrears,
      creator,
      status
    } = param
    db.query(
      sql.insert,
      [
        auto_increment,
        create_date,
        order_number,
        delivery_time,
        goods,
        total_price,
        real_price,
        discount_price,
        arrears,
        creator,
        status
      ],
      callback
    )
  },
  // 根据id修改数据
  updateById: (param = {}, callback) => {
    const {
      create_date,
      order_number,
      delivery_time,
      goods,
      total_price,
      real_price,
      discount_price,
      arrears,
      creator,
      update_date,
      update_by,
      status,
      id
    } = param
    db.query(
      sql.updateStatusById,
      [
        create_date,
        order_number,
        delivery_time,
        goods,
        total_price,
        real_price,
        discount_price,
        arrears,
        creator,
        update_date,
        update_by,
        status,
        id
      ],
      callback
    )
  },
  // 根据id修改状态
  updateStatusById: (param = {}, callback) => {
    const { status, update_date, update_by, id } = param
    db.query(
      sql.updateStatusById,
      [status, update_date, update_by, id],
      callback
    )
  }
}
module.exports = methods
