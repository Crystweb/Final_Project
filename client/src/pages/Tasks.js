import React, { Component } from 'react'
import routes from '../constants/routes'
import { Link } from 'react-router-dom'
import '../styles/Home.css'

class Tasks extends Component {
  render () {
    return (
      <div className="container">
        <nav className="navigation">
          <ul>
            <li><Link to={routes.tasks.hotelTasks.href}>{routes.tasks.hotelTasks.name}</Link></li>
            <li><Link to={routes.tasks.kitchenTasks.href}>{routes.tasks.kitchenTasks.name}</Link></li>
            <li><Link to={routes.tasks.firstRestaurantTasks.href}>{routes.tasks.firstRestaurantTasks.name}</Link></li>
            <li><Link to={routes.tasks.secondRestaurantTasks.href}>{routes.tasks.secondRestaurantTasks.name}</Link></li>
            <li><Link to={routes.tasks.cyclicTasks.href}>{routes.tasks.cyclicTasks.name}</Link></li>
            <li><Link to={routes.tasks.myTasks.href}>{routes.tasks.myTasks.name}</Link></li>
          </ul>
        </nav>
      </div>
    )
  }
}

export default Tasks
