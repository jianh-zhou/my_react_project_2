import React, { Component } from 'react'
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
// 引入发送验证码的api接口函数
import { reqSendCode } from '@api/login'
// 引入对应的正则表达式
import { phoneReg, codeReg } from '@utils/reg'
import './index.css'
const TIME_TOTAL = 5
class Login extends Component {
  state = {
    checkPhone: true,
    checkCode: true,
    isSendCode: false,
    timeout: TIME_TOTAL,
  }

  // 验证表单的内容
  validator = (rule, value, callback) => {
    // 检测手机号
    if (rule.field === 'phone') {
      let checkPhone = true
      if (phoneReg.test(value)) {
        checkPhone = false
      }
      this.setState({
        checkPhone,
      })
      // 检测验证码
    } else if (rule.field === 'code') {
      // console.log(1111)
      let checkCode = true
      if (codeReg.test(value)) {
        checkCode = false
      }
      this.setState({ checkCode })
    }
    // console.log(this.state.checkCode || this.state.checkPhone)
    callback()
  }

  // 发送验证码
  sendCode = async () => {
    this.setState({
      isSendCode: true,
    })
    //获取手机号码
    const phone = this.props.form.getFieldValue('phone')
    // 设置倒计时
    // 清理定时器
    clearInterval(this.timer)
    this.timer = setInterval(() => {
      const timeout = this.state.timeout - 1

      if (timeout < 1) {
        this.setState({
          timeout: TIME_TOTAL,
          isSendCode: false,
        })
        return
      }
      this.setState({
        timeout,
      })
    }, 1000)
    await reqSendCode(phone)
  }
  // 组件卸载的生命周期回调函数
  componentWillUnmount() {
    clearInterval(this.timer)
  }
  render() {
    const { getFieldProps } = this.props.form
    const { checkCode, checkPhone, isSendCode, timeout } = this.state
    // console.log(checkPhone, checkCode) 
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
            placeholder="请输入手机号"
            {...getFieldProps('phone', {
              rules: [
                {
                  validator: this.validator,
                },
              ],
            })}
          >
            <div className="phone-prefix">
              <span>+86</span>
              <Icon type="down" />
            </div>
          </InputItem>
          <WhiteSpace size="lg" />
          <div className="login-code">
            <InputItem
              clear
              placeholder="请输入手机验证码"
              {...getFieldProps('code', {
                rules: [
                  {
                    validator: this.validator,
                  },
                ],
              })}
            />
            <button
              onTouchEnd={this.sendCode}
              className="login-btn-text login-btn"
              style={{
                color: checkPhone || isSendCode ? '#848689' : 'red',
              }}
              disabled={checkPhone}
            >
              {isSendCode ? `正在发送 ${timeout}s` : '获取验证码'}
            </button>
          </div>
          <WhiteSpace size="lg" />
          <WingBlank size="lg">
            <Button
              type="warning"
              className="warning-btn"
              disabled={checkPhone || checkCode}
              // disabled={false}
            >
              登录
            </Button>
          </WingBlank>
          <WhiteSpace size="lg" />
          <div className="login-btn-wrap">
            <Link to="/login/pwd" className="login-btn-text">
              账户密码登录
            </Link>
            <Link to="/regist/verifyphone" className="login-btn-text">
              手机快速注册
            </Link>
          </div>
          <div className="login-other-text">其他登录方式</div>
          <div className="login-icons">
            <span className="iconfont icon-github"></span>
            <span className="iconfont icon-qq"></span>
            <span className="iconfont icon-wechat"></span>
          </div>
          <span className="login-private-policy">
            未注册的手机号验证后将自动创建硅谷账号, 登录即代表您已同意
            <Link to="/login" className="login-private-policy-btn">
              硅谷隐私政策
            </Link>
          </span>
        </WingBlank>
      </div>
    )
  }
}

export default createForm()(Login)
