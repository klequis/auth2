import { combineReducers } from 'redux'

export const users = (state = [], { type, payload }) => {
  switch(type) {
    default:
      return state
  }
}

export default combineReducers({
  users,
})