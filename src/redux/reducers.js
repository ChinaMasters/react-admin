import {combineReducers} from 'redux'
import {DECREMENT, INCREMENT, CURRENT_TITLE} from './type'
// 管理全局count状态
const count = (state = 1, action) => {
  switch (action.type){
    case INCREMENT :
      return state + action.data
    case DECREMENT :
      return state - action.data
    default: 
      return state 
  } 
}

const currentTitle = (state = '首页', action) => {
  // console.log('state', state)
  // console.log('action', action)
  switch (action.type){
    case CURRENT_TITLE :
      return action.data
    default: 
      return state
  } 
}

export default combineReducers({
  count,
  currentTitle
})