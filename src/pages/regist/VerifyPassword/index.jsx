import React, { useState } from 'react'
import { NavBar, Icon, InputItem, WingBlank, Modal } from 'antd-mobile'
import img from '@assets/imgs/msg.png'
import { createForm } from 'rc-form'
import './index.css'
function VerifyPassword({ form }) {
  // 表单验证的规则
  const validator = (rule, value, callback) => {
    // console.log(rule, value)
    // 设置对应的手机号码验证规则正则表达式
    const reg = /^\d{6}$/
    let isDisabled = true
    console.log(1111)
    if (reg.test(value)) {
      console.log(2222)
      isDisabled = false
    }
    this.setState({
      isDisabled,
    })
    callback()
  }
  const [isIcon, setIcon] = useState(true)
  const iconFontClass =
    'iconfont incoFontClass ' + (isIcon ? 'icon-eye1' : 'icon-eye')
  const changeInptView = () => {
    setIcon(!isIcon)
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
        {...form.getFieldProps('code', {
          rules: [{ validator }],
        })}
      ></InputItem>
    </div>
  )
}
export default createForm()(VerifyPassword)
