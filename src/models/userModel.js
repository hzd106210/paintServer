const db = require('./db')

/*
 * @Author: HuangZhaoda
 * @Date: 2020-10-27 13:52:35
 * @Last Modified by: HuangZhaoda
 * @Last Modified time: 2020-11-03 17:31:51
 * @desc 用户
 */
const sql = {
  create:
    'create table if not exists user(id int not null,phone varchar(20) not null' +
    ',name varchar(30) not null,openid varchar(50),primary key(id))',
  insert: 'insert into user (phone, name,openid) values (?, ?, ?)',
  queryByPhone: 'select * from user where phone=?',
  queryALl: 'select * from user order by ? ? ?'
}
const methodes = {
  // 建表
  create: (callback) => {
    db.query(sql.create, (error) => {
      console.log(`创建user表${error ? `失败：${error.message}❎` : '成功  ✔'}`)
      callback && callback(error)
    })
  },
  // 插入数据
  insert: (param = {}, callback) => {
    const { phone, name, openid = '' } = param
    db.query(sql.insert, [phone, name, openid], callback)
  },
  // 根据手机号查询
  queryByPhone: (phone, callback) => {
    db.query(sql.queryByPhone, [phone], callback)
  },
  // 查询所有
  queryAll: (param = {}, callback) => {
    const {
      orderBy = 'date',
      order = 'desc',
      pageSize = '',
      pageNo = ''
    } = param
    const limit = db.getLimitSql(pageNo, pageSize)
    db.query(sql.queryALl, [orderBy, order, limit], callback)
  }
}
module.exports = methodes
