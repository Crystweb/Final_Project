import { toastr } from 'react-redux-toastr'
import axios from 'axios'

export class Api {
  /**
   * Generic API used by custom methods
   */

  get (url) {
    return this.makeRequest(url)
  }

  post (url, body) {
    return this.makeRequest(url, 'POST', body)
  }

  put (url, body) {
    return this.makeRequest(url, 'PUT', body)
  }

  deleteApi (url) {
    return this.makeRequest(url, 'DELETE')
  }

  makeRequest (url, method, body) {
    const requestParams = {
      method: method || 'GET',
      body: body,
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    }

    return this.sendRequest(url, requestParams)
  }

  sendRequest (url, requestParams) {
    return new Promise((resolve, reject) => {
      axios(url, requestParams)
        .then(result => this.handleErrors(result, reject))
        .then(result => resolve(result))
        .catch(reason => {
          this.requestFailed(reason)
          reject(reason)
        })
    })
  }

  handleErrors (result, reject) {
    if (result.status === 401) {
      localStorage.setItem('token', null)
      window.location.reload()
    } else if (result.status >= 400) {
      this.requestFailed(result)
      reject(result)
    } else {
      return result
    }
  }

  requestFailed (reason) {
    if (reason.message === 'Failed to fetch') {
      toastr.error('Error', 'Network request has failed')
    } else if (reason.error) {
      toastr.error(reason.error, reason.message)
    } else {
      toastr.error('Error', 'An error has occurred')
    }
  }
}

const api = new Api()

export default api