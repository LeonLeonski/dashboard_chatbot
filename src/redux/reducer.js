const initialState = {
    auth: 0,
    tokenId: '',
    filters: {
      status: 'All',
      colors: []
    }
  }
  
  // Use the initialState as a default value
  export default function appReducer(state = initialState, action) {
    // The reducer normally looks at the action type field to decide what happens
    switch (action.type) {
      case 'LOGIN':
          return {
              ...state,
              tokenId: action.payload.tokenId
          }
      default:
        // If this reducer doesn't recognize the action type, or doesn't
        // care about this specific action, return the existing state unchanged
        return state
    }
  }