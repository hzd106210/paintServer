/*
 * @Author: HuangZhaoda
 * @Date: 2020-11-02 15:22:15
 * @Last Modified by: HuangZhaoda
 * @Last Modified time: 2020-11-03 16:59:44
 * @Desc
 */
const mysql = require('mysql')

class Db {
  constructor() {
    this.error = null
    this.init()
  }

  init() {
    this.connection = mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: 'hzd080900',
      database: 'paint',
      multipleStatements: true
    })
    this.connection.connect((error) => {
      this.error = error
    })
  }

  query(sql, values, callback) {
    if (this.error) {
      callback(this.error)
    } else {
      this.connection.query(sql, values, callback)
    }
  }

  getLimitSql(pageNo, pageSize) {
    let limit = ''
    if (pageNo && pageSize) {
      limit = `limit ${Number(pageNo) * Number(pageSize) - 1},${Number(
        pageSize
      )}`
    }
    return limit
  }
}

module.exports = new Db()
