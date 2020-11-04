const express = require('express')
const app = express()
//  控制器
app.use(require('./controler/index'))
// 创建表
require('./models/createTable')()
module.exports = app
