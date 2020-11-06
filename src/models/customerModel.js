/**
 * @auth HuangZhaoda
 * @desc 客户
 */
const db = require('./db')

const sql = {
  create: `create table if not exists customer(
    id int auto_inscrement not null,
    name varchar(30) not null,
    phone varchar(30) not null,
    address varchar(50),
    openid varchar(50),
    primary key(id)
  )`,
  insert: `insert into customer(
    name,phone,address,openid
  ) values (?,?,?,?)`,
  updateById: `update customer set 
  name=?,phone=?,address=?,openid=? 
  where id=?`,
  deleteById: `delete customer where id in(?)`,
  query: `select * from customer
  where name like "%?%"
  or phone like "%?%"
  or address like "%?%"
  ordery by ? ?`,
  qyeryById: 'select * from cunstomer where id=?'
}
const methods = {
  // 创建表
  create: (callback) => {
    db.query(sql.create, (error) => {
      console.log(
        `创建customer表${error ? `失败：${error.message}❎` : '成功 ✔'}`
      )
      callback && callback(error)
    })
  },
  // 插入数据
  insert: (param = {}, callback) => {
    const { name, phone, address = '', openid = '' } = param
    db.query(sql.insert, [name, phone, address, openid], callback)
  },
  // 根据id修改数据
  updateById: (param = {}, callback) => {
    const { name, phone, address = '', openid = '', id } = param
    db.query(sql.updateById, [name, phone, address, openid, id], callback)
  },
  // 根据id删除
  deleteById: (id, callback) => {
    db.query(sql.deleteById, [id], callback)
  },
  // 查询，根据 名称 手机号 地址 查询
  query: (param = {}, callback) => {
    const {
      name = '',
      phone = '',
      address = '',
      orderBy = 'date',
      order = 'desc'
    } = param
    db.query(sql.query, [name, phone, address, orderBy, order], callback)
  },
  // 根据id查询
  qyeryById: (id, callback) => {
    db.query(sql.qyeryById, callback)
  }
}
module.exports = methods
