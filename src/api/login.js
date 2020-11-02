import { passwordReg } from '@utils/reg'
import request from '@utils/request'
const path = '/login'
// 验证手机号是否被注册的api接口函数
export const reqSendCode = (phone) => request({
  method: 'POST',
  url: `${path}/digits`,
  data: { phone }
})

// 手机号登录的api接口函数
export const reqPhoneToLogin = (phone, code) => request({
  method: 'POST',
  url: `${path}/phone`,
  data: { phone, code }
})

//用户账号密码的登录的api接口函数
export const reqPasswordLogin = (phone, password) => {
  return request({
    method: "POST",
    url: `${path}/user`,
    data: { phone, password }

  })
}

// 验证用户是否登录的api接口函数
export const reqCheckLogin = () => request({
  method: 'POST',
  url: `${path}/verify`
})
