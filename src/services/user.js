const user = require('./../models/user')

class UserService {
  static login(param) {
    return new Promise(resolve => {
      const result = {
        success: false,
        msg: '',
        data: {}
      }
      if (!param.phone) {
        result.msg = '请输入手机号'
      } else {
        user.queryByPhone(param, (error, data) => {
          result.msg = error ? error.message : '登陆成功'
          result.data = data
          resolve(result)
        }))
      }
    })
  }
}
