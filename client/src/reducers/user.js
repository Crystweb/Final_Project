import { GET_CURRENT_USER } from '../constants/actionTypes'

const initialState = {
  currentUser: null
}

export default function addUserReducer (state = initialState, action) {
  switch (action.type) {
    case GET_CURRENT_USER:
      return {...state, currentUser: action.user}
    default:
      return state
  }
}
