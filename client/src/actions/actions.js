import * as types from '../constants/actionTypes'
import axios from "axios";


export function addShift (shift) {
  return {
    type: types.ADD_SHIFT,
    shift
  }
}

export const getAllVacancies = () => dispatch => {
  return (axios.get('/vacancy')
               .then(response => response.data)
               .then(data => dispatch( {type: types.GET_ALL_VACANCIES, payload: data} ) )
  )
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

export function addAllPositions (positions) {
  return {
    type: types.GET_ALL_POSITIONS,
    positions
  }
}

export function addCommentForSelectedDate (comments) {
  return {
    type: types.GET_COMMETNS_FOR_SELECTED_DATE,
    comments
  }
}

export function addAllSchedules (schedules) {
  return {
    type: types.GET_SCHEDULES,
    schedules
  }
}

export function addAllLocation (locations) {
  return {
    type: types.GET_LOCATIONS,
    locations
  }
}
