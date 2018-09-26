import React, { Component } from 'react'
import routes from '../constants/routes'
import { Link } from 'react-router-dom'
import '../styles/Home.css'

class Home extends Component {
  render () {
    return (
      <div className="container">
        <nav className="navigation">
          <Link to={routes.comments.href}>{routes.comments.name}</Link>
          <Link to={routes.tasks.href}>{routes.tasks.name}</Link>
          <Link to={routes.employees.href}>{routes.employees.name}</Link>
        </nav>
      </div>
    )
  }
}

export default Home
