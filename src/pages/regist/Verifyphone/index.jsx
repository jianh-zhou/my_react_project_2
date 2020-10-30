import React, { Component } from 'react'
import { NavBar, Icon, InputItem, WingBlank, Modal } from 'antd-mobile'
import { createForm } from 'rc-form'
// 引入腾讯验证的插件
import VerifyBtn from '@comp/VerifyBtn'
import './index.css'
import { reqVerifyRegistPhone } from '@api/regist'
// 引入对应的请求发送验证码的api接口函数
import { reqSendCode } from '@api/login'
class Verifyphone extends Component {
  // 组件挂载完毕的生命周期回调函数
  componentDidMount() {
    const alert = Modal.alert
    alert(
      '注册协议及隐私政策',
      <span className="tipcs">
        在您注册成为硅谷用户的过程中，您需要完成我们的注册流程并通过点击同意的形式在线签署以下协议，
        <strong className="imporant-tipcs">
          请您务必仔细阅读、充分理解协议中的条款内容后再点击同意（尤其是以粗体并下划线标识的条款，因为这些条款可能会明确您应履行的义务或对您的权利有所限制）：
        </strong>
        <span className="policy">《硅谷用户注册协议》</span>
        <span className="policy">《硅谷隐私政策》</span>
      </span>,
      [
        {
          text: '同意',
          onPress: () => console.log('cancel'),
          style: 'default',
        },
        { text: '不同意', style: { backgroundColor: 'red', color: '#fff' } },
      ]
    )
  }
  // 定义下一步按钮的禁用或者不禁用的状态
  state = {
    isDisabled: true,
  }
  // 表单验证的规则
  validator = (rule, value, callback) => {
    // console.log(rule, value)
    // 设置对应的手机号码验证规则正则表达式
    const reg = /^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/
    let isDisabled = true
    if (reg.test(value)) {
      isDisabled = false
    }
    this.setState({
      isDisabled,
    })
    callback()
  }
  // 进行异步请求验证手机号是否存在的回调函数
  next = async () => {
      // 获取手机号码
      const phone = this.props.form.getFieldProps('phone').value
      // console.log(phone)
      await reqVerifyRegistPhone(phone)
      // 发送对应的验证码
      await reqSendCode(phone)
      // 跳转到对应的验证验证码的页面
      this.props.history.push('/regist/verifycode', phone)
  }
  render() {
    const { isDisabled } = this.state
    const { getFieldProps } = this.props.form
    return (
      <div className="verify-regist-phone">
        <WingBlank>
          {/* 头部导航栏 */}
          <NavBar
            mode="light"
            icon={<Icon type="left" className="back-btn" />}
            onLeftClick={() => console.log('onLeftClick')}
            className="guigi-regist-nav"
          >
            硅谷注册
          </NavBar>
          {/* 电话号码输入栏 */}
          <InputItem
            clear
            placeholder="请输入手机号"
            defaultValue="15330649175"
            {...getFieldProps('phone', {
              rules: [{ validator: this.validator }],
            })}
          >
            <div className="choice-phone-conuntry">
              <span>+86</span>
              <Icon type="down"></Icon>
            </div>
          </InputItem>
          {/* 按钮 */}
          <VerifyBtn disabled={isDisabled} btnText="下一步" next={this.next} />
        </WingBlank>
      </div>
    )
  }
}
export default createForm()(Verifyphone)
