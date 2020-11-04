/*
 * @Author: HuangZhaoda
 * @Date: 2020-11-02 14:56:49
 * @Last Modified by: HuangZhaoda
 * @Last Modified time: 2020-11-03 17:31:54
 * @desc 规格 不同规格有不同价格
 */
const db = require('./db')

const sql = {
  create:
    'create table if not exists specifications(id int auto_increment not null,name varchar(50) not null,' +
    'level int not null,parent int,date date not null,primary key(id))',
  insert:
    'insert into specifications (name,level,parent,date) values (?,?,?,?)',
  queryAll: 'select * from specifications order by ? ? ?',
  queryById: 'select * from specifications where id=?'
}

const methodes = {
  // 创建表
  create: (callback) => {
    db.query(sql.create, (error) => {
      console.log(
        `创建specifications表${error ? `失败：${error.message}❎` : '成功  ✔'}`
      )
      callback && callback(error)
    })
  },
  // 插入数据
  insert: (param = {}, callback) => {
    const { name, level, parent = 0 } = param
    const date = new Date()
    db.query(sql.insert, [name, level, parent, date], callback)
  },
  // 查询所有货品
  queryAll: (param = {}, callback) => {
    const {
      orderBy = 'date',
      order = 'desc',
      pageNo = '',
      pageSize = ''
    } = param
    // 分页
    const limit = db.getLimitSql(pageNo, pageSize)
    db.query(sql.queryAll, [orderBy, order, limit], callback)
  },
  // 根据id查询货品
  queryById: (id, callback) => {
    db.query(sql.queryById, [id], callback)
  }
}
module.exports = methodes
