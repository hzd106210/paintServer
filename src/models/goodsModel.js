/*
 * @Author: HuangZhaoda
 * @Date: 2020-11-03 11:42:38
 * @Last Modified by: HuangZhaoda
 * @Last Modified time: 2020-11-03 17:31:44
 * @Desc 货品
 * 没有规格的时候设置默认规格？
 * 还是直接设置价格
 */
const db = require('./db')

const sql = {
  create:
    'create table if not exists goods(id int not null,name varchar(50),unit varchar(20) not null,descript text,' +
    'img varchar(50), in_stock_price varchar(50), sale_price varchar(50),date date not null,' +
    'specifications int,primary key(id)) ',
  insert:
    'insert into goods (name, unit, desc, imgs, in_stock_price, sale_price, date, specifications)' +
    ' VALUES (?,?,?,?,?,?,?,?)',
  queryById: 'select * from goods where id=?',
  updateById:
    'update goods set name=?, unit=?, desc=?, imgs=?, in_stock_price=?, sale_price=?, date=?, specifications=? where id=?',
  queryALl: 'select * from goods order by ? ? ?'
}

const methodes = {
  /**
   * 创建表
   */
  create: (callback) => {
    db.query(sql.create, (error) => {
      console.log(`创建goods表${error ? `失败：${error.message}❎` : '成功 ✔'}`)
      callback && callback(error)
    })
  },
  /**
   * 插入数据
   */
  insert: (param = {}, callback) => {
    const {
      name,
      unit,
      desc,
      imgs,
      in_stock_price,
      sale_price,
      date,
      specifications
    } = param
    db.query(
      sql.insert,
      [
        name,
        unit,
        desc,
        imgs,
        in_stock_price,
        sale_price,
        date,
        specifications
      ],
      callback
    )
  },
  /**
   * 根据id修改
   */
  updateById: (param = {}, callback) => {
    const {
      name,
      unit,
      desc,
      imgs,
      in_stock_price,
      sale_price,
      date,
      specifications,
      id
    } = param
    db.query(
      sql.updateById,
      [
        name,
        unit,
        desc,
        imgs,
        in_stock_price,
        sale_price,
        date,
        specifications,
        id
      ],
      callback
    )
  },
  /**
   * 根据id查询
   */
  queryById: (id, callback) => {
    db.query(sql.queryById, [id], callback)
  },
  // 查询所有
  queryALl: (param = {}, callback) => {
    const {
      orderBy = 'date',
      order = 'desc',
      pageNo = '',
      pageSize = ''
    } = param
    // 分页
    const limit = db.getLimitSql(pageNo, pageSize)
    db.query(sql.queryALl, [], callback)
  }
}

module.exports = methodes
