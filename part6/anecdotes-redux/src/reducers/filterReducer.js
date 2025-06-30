const initialState = ''

export const setFilter = (filter) => {
  return {
    type: 'SET_FILTER',
    payload: filter
  }
}

const filterReducer = (state = initialState, action) => {
  console.log('action: ', action)
  console.log('state: ', state)

  switch (action.type) {
    case 'SET_FILTER': 
      return action.payload
    default:
      return state
  }
}

export default filterReducer