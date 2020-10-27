import { combineReducers } from 'redux'
function test (preState=0, action) {
  switch (action.type) {
    default:
      return preState
  }
}
export default combineReducers({
  test
})