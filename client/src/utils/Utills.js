import axios from 'axios'

export const getLastShift = (callback) => {
  axios.get('http://localhost:9000/comment')
    .then(response => {
      let data = response.data
    })
    .then(callback)
}
