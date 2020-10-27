import axios from 'axios'
// 调用create方法,相当于生成一个实例
const request = axios.create({
  baseURL: '/api',//请求头的地址
  headers: {},//默认的请求头信息
  timeout: 10000,//超时时间
})
// 设置请求拦截
request.interceptors.request.use((config) => {
  // if (token) {
  //   config.headers[auth] = `Bearer${token}`
  // }
  return config
})
// 设置响应拦截
request.interceptors.response.use((response) => {
  if (response.data.code === 20000) {
    return response.data.data
  } else {
    return Promise.reject(response.data.messages)
  }
}, (err) => {
  if (err.message) {
    if (err.message.status === 401) { }
  } else {

  }
})
// 暴露这个二次封装的axios
export default request