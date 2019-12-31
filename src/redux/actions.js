import {DECREMENT, INCREMENT, CURRENT_TITLE} from './type'
export const increment = (number) => {
  return {type: INCREMENT, data: number}
}
export const decrement = (number) => {
  return {type: DECREMENT, data: number}
}
export const setTitle = (title) => {
  return {type: CURRENT_TITLE, data: title}
}