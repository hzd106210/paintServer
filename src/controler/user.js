/*
 * @Author: HuangZhaoda
 * @Date: 2020-10-27 14:00:06
 * @Last Modified by: HuangZhaoda
 * @Last Modified time: 2020-11-04 09:35:47
 * @desc 用户模块路由
 */

const express = require('express')
const user = require('./../models/user')

const router = express.Router()

const SERVER_ERROR_MESSAGE = '服务端错误，请联系管理员'

/**
 * 登陆
 */
router.post('/login', (req, res) => {
  const param = req.body || {}
  if (param.phone) {
    user.queryByPhone(param.phone, (error, result) => {
      if (error) {
        res.json({ code: -1, data: {}, msg: SERVER_ERROR_MESSAGE })
      } else if (!result.length) {
        res.json({
          code: -1,
          data: {},
          msg: '登陆失败，你不是该应用用户，请联系管理员注册'
        })
      } else {
        res.json({ code: 0, data: result[0], msg: '登陆成功' })
      }
    })
  } else {
    res.json({ code: -1, data: {}, msg: '请输入手机号' })
  }
})

/**
 * 注册
 */
router.post('/registed', (req, res) => {
  const param = req.body
  if (param) {
    user.insert(param, (error, result) => {
      if (error) {
        res.json({ code: -1, data: {}, msg: SERVER_ERROR_MESSAGE })
      } else {
        res.json({ code: 0, data: {}, msg: '注册成功' })
      }
    })
  } else {
    res.json({ code: -1, data: {}, msg: '' })
  }
})

module.exports = router
