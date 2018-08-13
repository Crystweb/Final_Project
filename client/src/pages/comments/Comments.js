import React, { Component } from 'react'
import '../../styles/Comments.css'
import Preloader from '../../components/Preloader'
import routes from '../../constants/routes'
import { Link } from 'react-router-dom'
import { getLastShift } from '../../utils/Utills'

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
    getLastShift(data => {
      this.setState({
        userName: data.user.login,
        userMessage: data.message,
        messageDate: data.date
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
