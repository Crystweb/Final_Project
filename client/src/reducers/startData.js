import {
  GET_ALL_POSITIONS, GET_ALL_USERS,
  GET_CURRENT_USER, GET_FREQUENCIES,
  GET_LOCATIONS,
  GET_SCHEDULES,
  GET_TASK_STATUSES
} from '../constants/actionTypes'

const initialState = {
  currentUser: null,
  positions: null,
  schedules: null,
  locations: null,
  statuses: null,
  frequencies: null,
  users: null
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
    case GET_TASK_STATUSES:
      return {...state, statuses: action.statuses}
    case GET_FREQUENCIES:
      return{...state, frequencies: action.frequencies}
    case GET_ALL_USERS:
      return {...state, users: action.users}
    default:
      return state
  }
}
