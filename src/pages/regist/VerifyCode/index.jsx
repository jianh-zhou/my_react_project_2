import React, { Component } from 'react'
import {
  NavBar,
  Icon,
  InputItem,
  WingBlank,
  Modal,
  Toast,
  Button,
} from 'antd-mobile'
import { createForm } from 'rc-form'
import { reqSendCode } from '@api/login'
// 引入验证验证码的api接口函数
import { reqVerifyCode } from '@api/regist'
import './index.css'
import img from '@assets/imgs/msg.png'
const TOTAL_TIME = 5
class VerifyCode extends Component {
  state = {
    isShow: true,
    time: TOTAL_TIME,
    isDisabled: true,
  }
  // 组件加载完毕的生命周期回调函数
  componentDidMount() {
    // 调用对应的计时器
    this.setTimer()
  }
  // 组件卸载完毕后的生命周期回调函数
  componentWillUnmount() {
    clearInterval(this.timer)
  }
  // 定义对应的计时器
  setTimer = () => {
    this.timer = setInterval(() => {
      // console.log(1)
      const time = this.state.time - 1
      if (time < 1) {
        clearInterval(this.timer)
        this.setState({
          time: TOTAL_TIME,
          isShow: false,
        })
        return
      }
      this.setState({
        time,
        isShow: true,
      })
    }, 1000)
  }
  // 点击按钮重新获取验证码
  sendCode = () => {
    const phone = this.props.location.state
    Modal.alert(
      '',
      `我们将发送短信/语音验证码至：${this.props.location.state}`,
      [
        {
          text: '取消',
          style: 'default',
        },
        {
          style: { background: 'red' },
          text: '确定',
          onPress: async () => {
            this.setState({
              isShow: true,
            })
            this.setTimer()
            await reqSendCode(phone)
          },
        },
      ]
    )
    // console.log(phone);
  }
  // 表单验证的规则
  validator = (rule, value, callback) => {
    // console.log(rule, value)
    // 设置对应的手机号码验证规则正则表达式
    const reg = /^\d{6}$/
    let isDisabled = true
    // console.log(1111)
    if (reg.test(value)) {
      console.log(2222)
      isDisabled = false
    }
    this.setState({
      isDisabled,
    })
    callback()
  }

  // 点击按钮,进行验证手机验证码
  goSetPassword = async () => {
    // 收集到表单中的手机号和验证码
    const { code } = this.props.form.getFieldsValue()
    const phone = this.props.location.state
    console.log(phone, code)
    //发送对应请求,请求手机号和验证码是否正确
    await reqVerifyCode(phone, code)
    // 跳转到对应的密码设置的页面
    this.props.history.push('/regist/verifypassword', phone)
  }
  render() {
    const { getFieldProps } = this.props.form
    const { isShow, time, isDisabled } = this.state
    return (
      <div className="verify-code">
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
        <p className="verify-code-tips">
          我们将以短信或电话的形式将验证码发送给您,请注意接听0575/025/0592/010等开头的电话
        </p>
        <div className="verify-code-input">
          <InputItem
            clear
            placeholder="请输入手机验证码"
            {...getFieldProps('code', {
              rules: [{ validator: this.validator }],
            })}
          ></InputItem>
          <Button
            className="verify-code-btn"
            onClick={this.sendCode}
            disabled={isShow}
          >
            {isShow ? `重新发送: ${time}s` : '获取验证码'}{' '}
          </Button>
        </div>
        <Button
          className="verify-code-nextStep"
          disabled={isDisabled}
          onClick={this.goSetPassword}
        >
          下一步
        </Button>
        <p className="verify-code-tip">
          遇到问题 ? 请<span>联系客服</span>
        </p>
      </div>
    )
  }
}
export default createForm()(VerifyCode)
