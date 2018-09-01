import * as types from '../constants/actionTypes'

export function addShift (shift) {
  return {
    type: types.ADD_SHIFT,
    shift
  }
}

export function addSelectedDateFromCalendar (date) {
  return {
    type: types.GET_SELECTED_DATE,
    date
  }
}

export function addCurrentUser (user) {
  return {
    type: types.GET_CURRENT_USER,
    user
  }
}
