const express = require('express')
const router = express.Router()
const goods = require('./../models/goods')
router.post('/queryGoodsById', (res, req) => {
  const param = res.body
  if (param.id) {
    req.json({ code: -1, dat: {}, msg: '缺少参数:id' })
  } else {
    goods
  }
})
module.exports = router
