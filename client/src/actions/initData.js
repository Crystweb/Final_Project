import { START_DATA_LOADING } from '../constants/actionTypes'

import {
  addAllLocation,
  addAllPositions,
  addAllSchedules, addAllUsers,
  addCurrentUser,
  addFrequencies,
  addShift, addTasks,
  addTaskStatuses
} from './actions'
import api from '../services/Api'

const initData = () => {
  return dispatch => new Promise((resolve, reject) => {
    dispatch(setDataLoadingState(true))

    Promise.all([
      api.get('/position/list').then(response => dispatch(addAllPositions(response.data))),
      api.get('/schedule').then(response => dispatch(addAllSchedules(response.data))),
      api.get('/location/main').then(response => dispatch(addAllLocation(response.data))),
      api.get('/workshift').then(response => dispatch(addShift(response.data))),
      api.get('/task/status').then(response => dispatch(addTaskStatuses(response.data))),
      api.get('/task/frequency').then(response => dispatch(addFrequencies(response.data))),
      api.get('/user').then(response => dispatch(addAllUsers(response.data))),
      api.get('/task').then(response => dispatch(addTasks(response.data))),
      api.get('/user/current',{
        headers: { "Authorization": "Bearer " + localStorage.getItem('token')},
        credentials: 'include',
        mode: 'cors'
      }).then(response => dispatch(addCurrentUser(response.data)))

    ])
      .then(result => {
        dispatch(setDataLoadingState(false))
        resolve()
      }, reason => {
        reject(reason)
      })
  })
}

export default initData

const setDataLoadingState = (newState) => {
  return {
    type: START_DATA_LOADING,
    newState
  }
}

