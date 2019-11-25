import { createStore as reduxCreateStore } from 'redux'

const reducer = (state, action) => {
  if (action.type === `SETPREVLOCATION`) {
    return Object.assign({}, state, {
      prevLocation: typeof action.payload !== 'undefined' ? action.payload : initialState.prevLocation,
    })
  }
  if (action.type === `SETPARAM`) {
    return Object.assign({}, state, {
      count: action.payload ? action.payload : 0,
    })
  }
  if (action.type === `SETPAGETRANSITIONURLTARGET`) {
    return Object.assign({}, state, {
      pageTransitionURLTarget: action.payload ? action.payload : false,
    })
  }
  if (action.type === `SETPAGETRANSITIONING`) {
    return Object.assign({}, state, {
      pageTransitioning: action.payload ? action.payload : false,
    })
  }
  if (action.type === `TOGGLESHOWGRID`) {
    return Object.assign({}, state, {
      showGridHelper: typeof action.payload !== 'undefined' ? action.payload : !state.showGridHelper,
    })
  }
  if (action.type === `TOGGLESHOWBORDERS`) {
    return Object.assign({}, state, {
      showBorders: typeof action.payload !== 'undefined' ? action.payload : !state.showBorders,
    })
  }
  return state
}

const initialState = {
  param: 0.5,
  pageTransitionURLTarget: false,
  pageTransitioning: false,
  showGridHelper: false,
  showBorders: false,
  prevLocation: {},
}

const createStore = () =>
  reduxCreateStore(
    reducer,
    initialState,
    typeof window !== 'undefined'
      ? window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
      : (() => {})()
  )
export default createStore
