import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import reducers from './reducers'
// 实现异步
let middleWare = applyMiddleware(thunk)
// 判断开发的环境
if (process.env.NODE_ENV === "development") {
  middleWare = composeWithDevTools(middleWare)
}
export default createStore(reducers, middleWare)