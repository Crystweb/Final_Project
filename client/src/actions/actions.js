import * as types from '../constants/actionTypes'
import axios from 'axios'
import { UPDATE_COMMENT } from '../constants/actionTypes'
import { DELETE_CALENDAR_DATE } from '../constants/actionTypes'
import { ADD_ROOM_CHECK_HISTORY } from '../constants/actionTypes'
import { SAVE_CURRENT_FLOOR } from '../constants/actionTypes'
import { DELETE_CURRENT_FLOOR } from '../constants/actionTypes'
import { USER_DOWNLOAD } from '../constants/actionTypes'
import { SAVE_TOKEN } from '../constants/actionTypes'

export function addShift (shift) {
  return {
    type: types.ADD_SHIFT,
    shift
  }
}

export const getAllVacancies = () => dispatch => {
  return axios.get('/vacancy')
    .then(response => dispatch({type: types.GET_ALL_VACANCIES, payload: response.data}))
}

export function addNewVacancy (dispatch, vacancy) {
  axios({
    url: '/vacancy',
    method: 'POST',
    data: vacancy
  })
    .then(response => response.data)
    .then(data => dispatch({type: types.ADD_NEW_VACANCY, payload: data}))
}

export function updateVacancy (vacancy) {
  axios({
    url: '/vacancy',
    method: 'PUT',
    data: vacancy
  })
    .then(res => ({...vacancy, res}))

  return {
    type: types.UPDATE_VACANCY,
    vacancy
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

export function addTaskStatuses (statuses) {
  return {
    type: types.GET_TASK_STATUSES,
    statuses
  }
}

export function addTasks (tasks) {
  return {
    type: types.GET_TASKS,
    tasks
  }
}

export function addFrequencies (frequencies) {
  return {
    type: types.GET_FREQUENCIES,
    frequencies
  }
}

export function addAllUsers (users) {
  return {
    type: types.GET_ALL_USERS,
    users
  }
}

export function addNewTask (newTask) {
  return {
    type: types.ADD_NEW_TASK,
    newTask
  }
}

export function deleteTask (task) {
  return {
    type: types.DELETE_CLOSED_TASK,
    task
  }
}

export function addHitoryTasks (task) {
  return {
    type: types.ADD_TASKS_FOR_HISTORY,
    task
  }
}

export function deleteComment (id) {
  return {
    type: types.DELETE_COMMENT,
    id
  }
}

export function addNewComment (comment) {
  return {
    type: types.ADD_NEW_COMMENT,
    comment
  }
}

export function updateComment (comment) {
  return {
    type: UPDATE_COMMENT,
    comment
  }
}

export function deleteDate () {
  return {
    type: DELETE_CALENDAR_DATE
  }
}

export function addChecKHistory (roomCheck) {
  return {
    type: ADD_ROOM_CHECK_HISTORY,
    roomCheck
  }
}

export function saveFlloorId (floor) {
  return {
    type: SAVE_CURRENT_FLOOR,
    floor
  }
}

export function deleteCurrentFloor () {
  return {
    type: DELETE_CURRENT_FLOOR
  }
}

export function downloadUser (bool) {
  return {
    type: USER_DOWNLOAD,
    bool
  }
}

