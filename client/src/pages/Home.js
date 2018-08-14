import React, { Component } from 'react'
import routes from '../constants/routes'
import { Link } from 'react-router-dom'
import '../styles/Home.css'

class Home extends Component {
  render () {
    return (
      <div className="container">
        <nav className="navigation">
          <ul>
            <li><Link to={routes.comments.href}>{routes.comments.name}</Link></li>
            <li><Link to={routes.tasks.href}>{routes.tasks.name}</Link></li>
            <li><Link to={routes.employees.href}>{routes.employees.name}</Link></li>
            <li><Link to={routes.washingData.href}>{routes.washingData.name}</Link></li>
          </ul>
        </nav>
      </div>
    )
  }
}

export default Home;
