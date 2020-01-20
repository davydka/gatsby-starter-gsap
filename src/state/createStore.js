import { createStore as reduxCreateStore } from 'redux'

const reducer = (state, action) => {
  if (action.type === `SETCURRENTSCROLL`) {
    return Object.assign({}, state, {
      currentScroll: typeof action.payload !== 'undefined' ? action.payload : initialState.currentScroll,
    })
  }
  if (action.type === `SETLASTSCROLL`) {
    return Object.assign({}, state, {
      lastScroll: typeof action.payload !== 'undefined' ? action.payload : initialState.lastScroll,
    })
  }
  if (action.type === `SETPREVLOCATION`) {
    return Object.assign({}, state, {
      prevLocation: typeof action.payload !== 'undefined' ? action.payload : initialState.prevLocation,
    })
  }
  if (action.type === `SETPARAM1`) {
    return Object.assign({}, state, {
      param1: action.payload ? action.payload : initialState.param1,
    })
  }
  if (action.type === `SETPARAM2`) {
    return Object.assign({}, state, {
      param2: action.payload ? action.payload : initialState.param2,
    })
  }
  if (action.type === `SETPARAM3`) {
    return Object.assign({}, state, {
      param3: action.payload ? action.payload : initialState.param3,
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
  if (action.type === `SETPAGETRANSITIONINGIN`) {
    return Object.assign({}, state, {
      pageTransitioningIn: action.payload ? action.payload : false,
    })
  }
  if (action.type === `SETPAGETRANSITIONSTART`) {
    return Object.assign({}, state, {
      pageTransitionStart: action.payload ? action.payload : 0,
    })
  }
  if (action.type === `SETPAGETRANSITIONEND`) {
    return Object.assign({}, state, {
      pageTransitionEnd: action.payload ? action.payload : 0,
    })
  }
  if (action.type === `SETHEROREF`) {
    return Object.assign({}, state, {
      heroRef: typeof action.payload !== 'undefined' ? action.payload : null,
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
  if (action.type === `SETE1`) {
    return Object.assign({}, state, {
      e1: typeof action.payload !== 'undefined' ? action.payload : initialState.e1,
    })
  }
  if (action.type === `SETE2`) {
    return Object.assign({}, state, {
      e2: typeof action.payload !== 'undefined' ? action.payload : initialState.e2,
    })
  }
  return state
}

const initialState = {
  currentScroll: 0,
  lastScroll: 0,
  param1: 0.0,
  param2: 0.0,
  param3: 0.0,
  pageTransitionURLTarget: false,
  pageTransitioning: false,
  pageTransitioningIn: false,
  pageTransitionStart: 0,
  pageTransitionEnd: 0,
  showGridHelper: false,
  showBorders: false,
  prevLocation: {},
  heroRef: null,
  e1: {
    start: {
      x: 0.012,
      y: 0.0,
      scale: 1,
    },
    end: {
      x: 0.045,
      y: 1.0,
      scale: 1,
    },
  },
  e2: {
    points: [
      {
        x: 0,
        y: 0.505,
      },
      {
        x: 0.025,
        y: 1,
      },
      {
        x: 0.025,
        y: 0,
      },
      {
        x: 0.04375,
        y: 0.5,
      },
      {
        x: 0.06302083333333333,
        y: 0,
      },
      {
        x: 0.06302083333333333,
        y: 1,
      },
      {
        x: 0.0828125,
        y: 0.5,
      },
      {
        x: 0.9,
        y: 0.4,
      },
    ],
  },
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
