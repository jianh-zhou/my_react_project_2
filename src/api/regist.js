import request from '@utils/request'
const path = '/regist'
// 验证手机号是否被注册的api接口函数
export const reqVerifyRegistPhone = (phone) => request({
  method: 'POST',
  url: `${path}/verify_phone`,
  data: { phone }
})