import React, { Component } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
// 引入注册路由组件的数组
import routes from '@config/routes'
export default class App extends Component {
  render() {
    return (
      <Router>
        {routes.map((route) => {
          return <Route {...route} key={route.path}></Route>
        })}
      </Router>
    )
  }
}
