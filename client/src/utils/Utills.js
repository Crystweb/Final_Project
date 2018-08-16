import axios from 'axios'

export const getLastShift = (callback) => {
  axios.get('/comment')
    .then(response => response.data)
    .then(callback)
}

export const getEmployees = (callback) => {
  axios.get('/employees', {
    params : {
      uid:"",
      forename:"",
      surname:""
    }
  })
    .then(response => response.data)
    .then(callback)
}
