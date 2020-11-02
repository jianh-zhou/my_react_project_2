import React, { Component } from 'react'
import { connect } from 'react-redux'
//引入对应验证是否登录过的action
import { getCheckLogin } from '@redux/actions'
class Home extends Component {
  // 组件加载完毕的生命周期回调函数
  async componentDidMount() {
    await this.props.getCheckLogin()
  }
  render() {
    const { user } = this.props
    return (
      <div>
        <h1>{user.username}</h1>
        <img src={user.avatar} alt="" width="200" height="200" />
      </div>
    )
  }
}
export default connect((state) => ({ user: state.user }), { getCheckLogin })(
  Home
)
