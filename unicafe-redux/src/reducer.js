const initialState = {
  good: 0,
  ok: 0,
  bad: 0,
  value: 0,
}

const counterReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'GOOD':
      return {...state, good: state.good + 1, value: state.value + 1}
    case 'OK':
      return {...state, ok: state.ok + 1, value: state.value + 0}
    case 'BAD':
      return {...state, bad: state.bad + 1, value: state.value -1}
    case 'ZERO':
      return initialState
    default: return state
  }
  
}

export default counterReducer