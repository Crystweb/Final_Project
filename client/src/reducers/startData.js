import { GET_ALL_POSITIONS, GET_CURRENT_USER, GET_LOCATIONS, GET_SCHEDULES } from '../constants/actionTypes'

const initialState = {
  currentUser: null,
  positions: null,
  schedules: null,
  locations: null
}

export default function startDataReducer (state = initialState, action) {
  switch (action.type) {
    case GET_CURRENT_USER:
      return {...state, currentUser: action.user}
    case GET_ALL_POSITIONS:
      return {...state, positions: action.positions}
    case GET_SCHEDULES:
      return {...state, schedules: action.schedules}
    case GET_LOCATIONS:
      return {...state, locations: action.locations}
    default:
      return state
  }
}
