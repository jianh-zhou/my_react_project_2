import request from '@utils/request'
const path = '/login'
// 验证手机号是否被注册的api接口函数
export const reqSendCode = (phone) => request({
  method: 'POST',
  url: `${path}/digits`,
  data: { phone }
})

// // 设置密码后的api接口函数
// export const reqPasswordToLogin = (phone, password) => request({
//   method: 'POST',
//   url: `${path}/user`,
//   data: { phone, password }
// })