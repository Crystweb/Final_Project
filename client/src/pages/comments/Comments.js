import React, { Component } from 'react'
import '../../styles/comments.css'
import settings from '../../constants/settings'
import axios from 'axios'
import Preloader from '../../components/preloader'
import routes from '../../constants/routes'
import { Link } from 'react-router-dom'

class Comments extends Component {
  constructor (props) {
    super(props)
    this.state = {
      userName: null,
      userMessage: null,
      messageDate: null
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
    if (!!this.state.userName && !!this.state.userMessage && !!this.state.messageDate) {
      return (
        <div className="container">
          <section className="comments">
            <h2>{this.state.userName}</h2>
            <h1>{this.state.userMessage}</h1>
            <h3>{this.state.messageDate}</h3>
          </section>
          <nav className="navigation">
            <ul>
              <li><Link to={routes.addNewComments.href}>{routes.addNewComments.name}</Link></li>
              <li><Link to={routes.commentsHistory.href}>{routes.commentsHistory.name}</Link></li>
            </ul>
          </nav>
        </div>
      )
    } else {
      return (
        <div>
          <Preloader/>
        </div>
      )
    }
  }
}

export default Comments
