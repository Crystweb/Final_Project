import axios from 'axios'

export const getLastShift = (callback) => {
  axios.get('/comment')
    .then(response => response.data)
    .then(callback)
}
