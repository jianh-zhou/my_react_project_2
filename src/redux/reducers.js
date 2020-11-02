import { combineReducers } from 'redux'
// 引入对应的常量
import { GET_USER_INFO } from './constants'
function user (preState = {}, action) {
  switch (action.type) {
    case GET_USER_INFO:
      return action.data
    default:
      return preState
  }
}
export default combineReducers({
  user
})