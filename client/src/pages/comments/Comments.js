import React, { Component } from 'react'
import '../../styles/comments.css'
import settings from '../../constants/settings'
import axios from 'axios'

class Comments extends Component {
  constructor (props) {
    super(props)
    this.state = {
      userName: '',
      userMessage: '',
      messageDate: ''
    }
  }

  componentDidMount () {
    axios.get(settings.api + '/comment')
      .then(response => {
        let commentInfo = response.data
        console.log(commentInfo)

        this.setState({
          userName: commentInfo.user.login,
          userMessage: commentInfo.message,
          messageDate: commentInfo.date
        })
      })
  }

  render () {
    return (
      <div className="container">
        <h2>{this.state.userName}</h2>
        <h1>{this.state.userMessage}</h1>
        <h3>{this.state.messageDate}</h3>
      </div>
    )
  }
}

export default Comments
