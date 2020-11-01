import request from '@utils/request'
const path = '/regist'
// 验证手机号是否被注册的api接口函数
export const reqVerifyRegistPhone = (phone) => request({
  method: 'POST',
  url: `${path}/verify_phone`,
  data: { phone }
})

// 验证验证码是否正确的api接口函数
export const reqVerifyCode = (phone, code) => request({
  method: "POST",
  url: `${path}/verify_code`,
  data: { phone, code }
})

// 设置密码后的api接口函数
export const reqPasswordToLogin = (phone, password) => request({
  method: 'POST',
  url: `${path}/user`,
  data: { phone, password }
})