import React, { Component } from 'react'
import { Button, Toast } from 'antd-mobile'
// 引入对应的滑块验证api
import { reqTencentVerify } from '@api/common'
export default class VerifyBtn extends Component {
  // 组件挂载完毕的生命周期回调函数
  componentDidMount() {
    window.tencentVerify = async (res) => {
      // console.log(res)
      // res（用户主动关闭验证码）= {ret: 2, ticket: null}
      // res（验证成功） = {ret: 0, ticket: "String", randstr: "String"}
      try {
        if (res.ret === 0) {
          // alert(res.ticket) // 票据
          await reqTencentVerify(res.randstr, res.ticket)
          this.props.next()
        }
      } catch (err) {
        Toast.fail(err)
      }
    }
  }
  render() {
    const { disabled } = this.props
    // console.log(disabled)
    return (
      <div>
        <Button
          id="TencentCaptcha"
          data-appid="2030765311"
          data-cbfn="tencentVerify"
          className="next-step-btn"
          type="warning"
          style={{ display: disabled ? 'none' : 'block' }}
        >
          下一步
        </Button>
        <Button
          type="warning"
          disabled={disabled}
          className="next-step-btn"
          style={{ display: !disabled ? 'none' : 'block' }}
        >
          下一步
        </Button>
      </div>
    )
  }
}
