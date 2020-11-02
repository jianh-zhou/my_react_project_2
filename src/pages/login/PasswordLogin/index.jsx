import { useState } from 'react'
import { connect } from 'react-redux'
// 引入对应的action
import { getUserInfoSave } from '@redux/actions'
import {
  NavBar,
  Icon,
  InputItem,
  WingBlank,
  WhiteSpace,
  Button,
  Toast,
} from 'antd-mobile'

import { Link } from 'react-router-dom'
import { createForm } from 'rc-form'
// 引入验证手机号码和密码的正则表达式
import { passwordReg, phoneReg } from '@utils/reg'
import './index.css'

function PasswordLogin({
  form: { getFieldProps, getFieldsValue },
  getUserInfoSave,
  history,
}) {
  // 定义对应的数据状态
  const [phoneAndPassword, setPhoneAndPassword] = useState({
    checkPhone: true,
    checkPassword: true,
  })
  // 定义一个状态用来改变密码的显示与影藏
  const [changePasswordView, setChangePasswordView] = useState(false)
  // 表单的校验规则
  const validator = (rule, value, callback) => {
    let { checkPhone, checkPassword } = phoneAndPassword
    // 判断校验的是不是手机号
    if (rule.field === 'phone') {
      // console.log(1);
      checkPhone = true
      if (phoneReg.test(value)) {
        checkPhone = false
      }
    } else if (rule.field === 'password') {
      checkPassword = true
      if (passwordReg.test(value)) {
        checkPassword = false
      }
    }
    setPhoneAndPassword({
      ...phoneAndPassword,
      checkPhone,
      checkPassword,
    })

    callback()
  }
  // 点击进行切换密码的显示方式
  const change = () => {
    setChangePasswordView(!changePasswordView)
  }
  //登录按钮的点击事件
  const toLoginByPassword = async () => {
    // console.log(1);
    // 获取手机号和密码
    const { phone, password } = getFieldsValue()
    // console.log(password, phone)
    try {
      const token = await getUserInfoSave(phone, password)
      // 将返回的token值设置为浏览器缓存
      window.localStorage.setItem('userToken', token)
      // 跳转到主页
      history.push('/')
    } catch (e) {
      Toast.fail(e, 3)
    }
  }
  const { checkPhone, checkPassword } = phoneAndPassword
  return (
    <div className="login container">
      <NavBar
        mode="light"
        icon={<Icon className="icon-left" type="left" />}
        // onLeftClick={() => console.log("onLeftClick")}
      >
        硅谷注册登录
      </NavBar>
      <WhiteSpace size="xl" />
      <WingBlank size="lg">
        <InputItem
          clear
          placeholder="用户名/邮箱/手机号"
          {...getFieldProps('phone', {
            rules: [
              {
                validator,
              },
            ],
          })}
        />
        <WhiteSpace size="lg" />
        <div className="login-code">
          <InputItem
            {...getFieldProps('password', {
              rules: [
                {
                  validator,
                },
              ],
            })}
            clear
            placeholder="请输入密码"
            type={!changePasswordView ? 'password' : 'text'}
            extra={
              <span
                onTouchEnd={change}
                className={
                  'iconfont ' + (!changePasswordView ? 'icon-eye1' : 'icon-eye')
                }
              ></span>
            }
          />
          <button
            className="login-btn-text login-btn"
            style={{ color: '#000' }}
          >
            忘记密码
          </button>
        </div>
        <WhiteSpace size="lg" />
        <WingBlank size="lg">
          <Button
            type="warning"
            className="warning-btn"
            disabled={checkPhone || checkPassword}
            onClick={toLoginByPassword}
          >
            登录
          </Button>
        </WingBlank>
        <WhiteSpace size="lg" />
        <div className="login-btn-wrap">
          <Link to="/login" className="login-btn-text">
            短信验证码登录
          </Link>
          <Link to="/regist/verifyphone" className="login-btn-text">
            手机快速注册
          </Link>
        </div>
        <div className="login-other-text">其他登录方式</div>
        <div className="login-icons">
          <span
            // onTouchEnd={this.loginByGithub}
            className="iconfont icon-github"
          ></span>
          <span className="iconfont icon-qq"></span>
          <span className="iconfont icon-wechat"></span>
        </div>
        <span className="login-private-policy">
          未注册的手机号验证后将自动创建硅谷账号, 登录即代表您已同意
          <Link to="/login/pwd" className="login-private-policy-btn">
            硅谷隐私政策
          </Link>
        </span>
      </WingBlank>
    </div>
  )
}

export default connect(null, { getUserInfoSave })(createForm()(PasswordLogin))
