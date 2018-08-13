import axios from 'axios'

export const getLastShift = (callback) => {
  axios.get('http://localhost:9000/comment')
    .then(response => {
      console.log(response)
    })

    .then(callback)
}
