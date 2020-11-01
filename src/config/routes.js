// 引入手机号码验证的组件
import Verifyphone from '@pages/regist/Verifyphone'
// 引入输入验证码的组件
import VerifyCode from '@pages/regist/VerifyCode'
// 引入填写密码的组件
import VerifyPassword from '@pages/regist/VerifyPassword'
// 引入对应的手机号登录的组件
import PhoneLogin from '@pages/login/PhoneLogin'
// 引入对应的账号密码登陆的组件
import PasswordLogin from '@pages/login/PasswordLogin'
// 引入主页组件
import Home from '@pages/Home'
const routes = [
  {
    path: '/',
    component: Home,
    exact: true
  },
  {
    path: "/regist/verifyphone",
    component: Verifyphone,
    exact: true
  },
  {
    path: '/regist/verifypassword',
    component: VerifyPassword,
    exact: true
  },
  {
    path: '/regist/verifycode',
    component: VerifyCode,
    exact: true
  },
  {
    path: '/login',
    component: PhoneLogin,
    exact: true
  }, {
    path: '/login/pwd',
    component: PasswordLogin,
    exact: true
  },

]
export default routes