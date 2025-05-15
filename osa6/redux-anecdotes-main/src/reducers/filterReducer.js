export const newFilter = (filter) => {
    return {
      type: "SET_FILTER",
      payload: {
        filter: filter
      }
    }
  }

const filterReducer = (state="", action) => {
  switch (action.type) {
    case 'SET_FILTER':
      return action.payload
    default:
      return state

  }
}

export default filterReducer
