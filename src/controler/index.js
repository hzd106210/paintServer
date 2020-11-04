const express = require('express')
const bodyParser = require('body-parser')
const router = express.Router()
// 参数转换
router.use(bodyParser.json())
router.use(bodyParser.urlencoded({ extended: true }))
// 用户
router.use('/user', require('./user'))
// 货品
router.use('/goods', require('./goods'))
// 到处路由
module.exports = router
