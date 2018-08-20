import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import Preloader from '../components/Preloader'

class EmployeeList extends Component {
  constructor (props) {
    super(props)
    this.state = {
      users: []
    }
  }

  componentDidMount () {
    axios.get('/employee')
      .then(response => this.setState({users: response}))
  }

  render () {
    if (!this.state.users.length) {
      return (
        <div>
          <Preloader/>
        </div>
      )
    } else {
      return (
        <ul className="employee-list">
          {this.state.users.map(function (user) {
            return (
              <li key={user.id}>
                <Link to="{'/users/' + user.id}">{user.name}</Link>
              </li>
            )
          })}
        </ul>
      )
    }
  }
}

export default EmployeeList
