export const filterAction = (filter) => {
  if (filter.length > 0) {
      return ({ type: "SET_FILTER", payload: filter.toLowerCase() })
  }
  return ({ type: "ALL", payload: null })
}

const filterReducer = (state = 'ALL', action) => {
  switch (action.type) {
      case 'SET_FILTER':
          return action.payload
      default:
          return state
  }
}

export default filterReducer