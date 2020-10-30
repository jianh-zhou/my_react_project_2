// 引入手机号码验证的组件
import Verifyphone from '@pages/regist/Verifyphone'
// 引入输入验证码的组件
import VerifyCode from '@pages/regist/VerifyCode'
// 引入填写密码的组件
import VerifyPassword from '@pages/regist/VerifyPassword'
const routes = [
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
  }
]
export default routes