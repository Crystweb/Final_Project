import axios from 'axios'

export const getLastShift = (callback) => {
  axios.get('/workshift')
    .then(response => response.data)
    .then(callback)
}

/*const arrUrlForStartData = [
  '/test/user',
  '/position/list',
  '/schedule',
  '/location',
  '/workshift',
  '/task/status',
  '/task/frequency',
  '/user',
  '/task'];

export const startData = (callback) => {
  arrUrlForStartData.forEach(url => axios.get(url)
    .then(response => response.data)
    .then(callback))
}*/


export const startData = (
  callbackUser,
  callbackPosition,
  callbackSchedule,
  callbackLocation,
  callbackComments,
  callbackStatus,
  callbackFrequency,
  callbackUsers,
  callbackTasks) => {
  axios.get('/test/user')
    .then(response => response.data)
    .then(callbackUser)
  axios.get('/position/list')
    .then(response => response.data)
    .then(callbackPosition)
  axios.get('/schedule')
    .then(response => response.data)
    .then(callbackSchedule)
  axios.get('/location')
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
  axios.get('/user')
    .then(response => response.data)
    .then(callbackUsers)
  axios.get('/task')
    .then(response => response.data)
    .then(callbackTasks)
}
