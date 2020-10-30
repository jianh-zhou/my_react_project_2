import axios from 'axios'
import { Toast } from 'antd-mobile'
const messages = {
  401: '没有权限,请登录后再进行访问',
  403: '禁止访问',
  404: '服务器找不到相关资源'
}
// 调用create方法,相当于生成一个实例
const request = axios.create({
  baseURL: '/',//请求头的地址
  // headers: {},//默认的请求头信息
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
    // return Promise.reject(response.data.messages)
    Toast.fail(response.data.messages)
  }
}, (err) => {
  let message = '未找到相关错误,请联系管理员'
  if (err.response) {
    if (messages[err.response.status]) {
      message = messages[err.response.status]
    }
  } else {
    if (err.message.indexOf("NetWork Err") >= 0) {
      message = "暂无网络，请打开网络连接或连接WIFI试试";
    } else if (err.message.indexOf("timeout") >= 0) {
      message = "网络延迟，请打开4/5G网络或WIFI试试";
    }
  }
  // return Promise.reject(message)
  Toast.fail(message)
})
// 暴露这个二次封装的axios
export default request