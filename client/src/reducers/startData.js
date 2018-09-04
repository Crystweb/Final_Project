import { GET_ALL_POSITIONS, GET_CURRENT_USER, GET_SCHEDULES } from '../constants/actionTypes'

const initialState = {
  currentUser: null,
  positions: null,
  schedules: null
}

export default function addUserReducer (state = initialState, action) {
  switch (action.type) {
    case GET_CURRENT_USER:
      return {...state, currentUser: action.user}
    case GET_ALL_POSITIONS:
      return {...state, positions: action.positions}
    case GET_SCHEDULES:
      return {...state, schedules: action.schedules}
    default:
      return state
  }
}
