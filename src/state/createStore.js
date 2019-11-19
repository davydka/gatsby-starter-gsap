import { createStore as reduxCreateStore } from "redux"

const reducer = (state, action) => {
  if (action.type === `SETPREVLOCATION`) {
    return Object.assign({}, state, {
      prevLocation: typeof action.payload !== 'undefined' ? action.payload : initialState.prevLocation,
    })
  }
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
  if (action.type === `TOGGLESHOWTARGET`) {
    return Object.assign({}, state, {
      showTransitionTarget: typeof action.payload !== 'undefined' ? action.payload : !state.showTransitionTarget,
    })
  }
  if (action.type === `TOGGLESHOWGROUP`) {
    return Object.assign({}, state, {
      showTransitionGroup: typeof action.payload !== 'undefined' ? action.payload : !state.showTransitionGroup,
    })
  }
  return state
}

const initialState = {
  count: 0.1,
  showTransitionTarget: false,
  showTransitionGroup: false,
  prevLocation: {}
}

const createStore = () => reduxCreateStore(
  reducer,
  initialState,
  typeof window !== 'undefined' ? window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__() : (() => {})())
export default createStore