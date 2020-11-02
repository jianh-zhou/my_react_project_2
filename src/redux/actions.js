
import { GET_USER_INFO } from './constants'
// 引入请求手机号码登录的api接口函数
import { reqPasswordLogin, reqCheckLogin } from '@api/login'
// 定义一个同步actiion,用来得到用户信息数据
const getUserInfo = (userInfo) => ({ type: GET_USER_INFO, data: userInfo })
// 定义一个异步action,用来登录时保存用户信息
export const getUserInfoSave = (phone, password) => {
  // console.log(1);
  return async (dispatch) => {
    // console.log(1);
    const result = await reqPasswordLogin(phone, password)
    // console.log(result);
    const action = getUserInfo(result.user)
    dispatch(action)
    // 并且将token值返回,
    return result.user.token
  }
}

// 定义一个异步的acition用来检验用户是否登录过
export const getCheckLogin = () => {
  return async (dispatch) => {
    const result = await reqCheckLogin()
    const action = getUserInfo(result)
    dispatch(action)
  }
}