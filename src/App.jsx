import React, { Component } from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import './App.css'
export default class App extends Component {
  render() {
    return (
      <Router>
        <div className="box"></div>
      </Router>
    )
  }
}
