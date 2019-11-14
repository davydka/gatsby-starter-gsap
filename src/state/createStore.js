import { createStore as reduxCreateStore } from "redux"

const reducer = (state, action) => {
  if (action.type === `INCREMENT`) {
    return Object.assign({}, state, {
      count: state.count + (action.payload ? action.payload : 1),
    })
  }
  if (action.type === `SET`) {
    return Object.assign({}, state, {
      count: action.payload ? action.payload : 0,
    })
  }
  return state
}

const initialState = {
  count: 0
}

const createStore = () => reduxCreateStore(reducer, initialState)
export default createStore