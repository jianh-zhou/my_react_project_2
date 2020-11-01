import React, { useState } from 'react'
import { NavBar, Icon, InputItem, WingBlank, Modal } from 'antd-mobile'
import img from '@assets/imgs/msg.png'
import { createForm } from 'rc-form'
import './index.css'
import { Button } from 'antd-mobile'
import { reqPasswordToLogin } from '@api/regist'
// 引入验证密码的正则表达式
import { passwordReg } from '@utils/reg'
function VerifyPassword({
  form: { getFieldValue, getFieldProps },
  location,
  history,
}) {
  // 设置密码的显示与隐藏的小图标
  const [isIcon, setIcon] = useState(true)
  //设置下一步按钮的禁用和不禁用
  const [toLoginBtn, setLoginBtn] = useState(true)
  // 表单验证的规则
  const validator = (rule, value, callback) => {
    // console.log(rule, value)
    // 设置对应的手机号码验证规则正则表达式
    let toLoginBtn = true
    if (passwordReg.test(value)) {
      toLoginBtn = false
    }
    setLoginBtn(toLoginBtn)
    callback()
  }

  // 设置密码的显示方式的样式
  const iconFontClass =
    'iconfont incoFontClass ' + (isIcon ? 'icon-eye1' : 'icon-eye')

  // 点击对应小按钮,切换密码的显示样式
  const changeInptView = () => {
    setIcon(!isIcon)
  }

  // 点击下一步,跳转到主页
  const toLogin = async () => {
    // 收集到密码框数据
    const password = getFieldValue('password')
    // 手机手机数据
    const phone = location.state
    // console.log(phone, password)
    // 发送请求
    await reqPasswordToLogin(phone, password)

    // console.log(1)
    // 跳转到主页
    history.push('/')
  }
  return (
    <div className="verify-password">
      {/* 头部导航栏 */}
      <NavBar
        mode="light"
        icon={<Icon type="left" className="back-btn" />}
        onLeftClick={() => console.log('onLeftClick')}
        className="guigi-regist-nav"
      >
        硅谷注册
      </NavBar>
      <p className="verify-code-img">
        <img src={img} />
      </p>
      <p className="verify-password-tips">请设置登录密码</p>
      <InputItem
        className="verify-password-ipt"
        clear
        extra={
          <span onTouchEnd={changeInptView} className={iconFontClass}></span>
        }
        placeholder="请输入8-20位登录密码"
        type={isIcon ? 'password' : 'text'}
        {...getFieldProps('password', {
          rules: [{ validator }],
        })}
      ></InputItem>
      <p className="setPasswordTip">
        密码由8-20位字母、数字或半角符号组成，不能是10位以下纯数字/字母/半角符号，字母需区分大小写
      </p>
      <Button
        className="passwordStDone"
        disabled={toLoginBtn}
        onClick={toLogin}
      >
        下一步
      </Button>
      <p className="query">
        遇到问题 ? 请 <span>联系客服</span>
      </p>
    </div>
  )
}
export default createForm()(VerifyPassword)
