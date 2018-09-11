import axios from 'axios'

export const getLastShift = (callback) => {
  axios.get('/workshift')
    .then(response => response.data)
    .then(callback)
}

export const startData = (callbackUser, callbackPosition, callbackSchedule, callbackLocation) => {
  axios.get('/user')
    .then(response => response.data)
    .then(callbackUser)
  axios.get('/position')
    .then(response => response.data)
    .then(callbackPosition)
  axios.get('/workshift/schedule')
    .then(response => response.data)
    .then(callbackSchedule)
  axios.get('/location')
    .then(response => response.data)
    .then(callbackLocation)
}
