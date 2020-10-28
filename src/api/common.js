import request from '@utils/request'
const path = '/common'
export const reqTencentVerify = (randStr, ticket) => request({
  method: 'POST',
  url: `${path}/verifycode`,
  data: {
    randStr, ticket
  }
})