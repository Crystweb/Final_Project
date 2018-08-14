import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import '../styles/Home.css'
import routes from '../constants/routes'

class WashingData extends Component {
  render () {
    return (
      <div className="container">
        <nav className="navigation">
          <ul>
            <li><Link to={routes.washingData.lodgers.href}>{routes.washingData.lodgers.name}</Link></li>
            <li><Link to={routes.washingData.salesNumbers.href}>{routes.washingData.salesNumbers.name}</Link></li>
          </ul>
        </nav>
      </div>
    )
  }
}

export default WashingData
