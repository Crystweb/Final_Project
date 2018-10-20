import * as types from '../constants/actionTypes'
import axios from 'axios'

export function addShift(shift) {
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

export function updateVacancy(vacancy) {
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

export function addSelectedDateFromCalendar(date) {
  return {
    type: types.GET_SELECTED_DATE,
    date
  }
}

export function addCurrentUser(user) {
  return {
    type: types.GET_CURRENT_USER,
    user
  }
}

export function addAllPositions(positions) {
  return {
    type: types.GET_ALL_POSITIONS,
    positions
  }
}

export function addCommentForSelectedDate(comments) {
  return {
    type: types.GET_COMMETNS_FOR_SELECTED_DATE,
    comments
  }
}

export function addAllSchedules(schedules) {
  return {
    type: types.GET_SCHEDULES,
    schedules
  }
}

export function addAllLocation(locations) {
  return {
    type: types.GET_LOCATIONS,
    locations
  }
}

export function addTaskStatuses(statuses) {
  return {
    type: types.GET_TASK_STATUSES,
    statuses
  }
}

export function addTasks(tasks) {
  return {
    type: types.GET_TASKS,
    tasks
  }
}

export function addFrequencies(frequencies) {
  return {
    type: types.GET_FREQUENCIES,
    frequencies
  }
}

export function addAllUsers(users) {
  return {
    type: types.GET_ALL_USERS,
    users
  }
}

export function addNewTask(newTask) {
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
