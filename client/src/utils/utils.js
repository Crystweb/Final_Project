import axios from 'axios'

export const getLastShift = (callback) => {
  axios.get('/workshift')
    .then(response => response.data)
    .then(callback)
}

export const startData = (
  callbackPosition,
  callbackSchedule,
  callbackLocation,
  callbackComments,
  callbackStatus,
  callbackFrequency,
  callbackUsers,
  callbackTasks) => {
  axios.get('/position/list')
    .then(response => response.data)
    .then(callbackPosition)
  axios.get('/schedule')
    .then(response => response.data)
    .then(callbackSchedule)
  axios.get('/location/main')
    .then(response => response.data)
    .then(callbackLocation)
  axios.get('/workshift')
    .then(response => response.data)
    .then(callbackComments)
  axios.get('/task/status')
    .then(response => response.data)
    .then(callbackStatus)
  axios.get('/task/frequency')
    .then(response => response.data)
    .then(callbackFrequency)
  axios.get('/task')
    .then(response => response.data)
    .then(callbackTasks)
}

export const getCurrentUser = (callback) => {
  axios.get('/user/current',{
  headers: { "Authorization": "Bearer " + localStorage.getItem('token')},
  credentials: 'include',
  mode: 'cors'
})
  .then(response => response.data)
  .then(callback)
}
