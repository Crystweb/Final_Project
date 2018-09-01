import axios from 'axios'

export const getLastShift = (callback) => {
  axios.get('/workshift')
    .then(response => response.data)
    .then(callback)
}
