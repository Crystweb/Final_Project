import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
// import Preloader from '../components/Preloader'

class EmployeeList extends Component {

  constructor (props) {
    super(props)
    this.state = {
        employee: []
    }
  }

  componentDidMount () {
    axios.get('/employee')
      .then(response => this.setState({employee: response.data}))
  }

  render () {
    // if (!this.state.users.length) {
    //         return (
    //             {/*<div>*/}
    //         {/*<Preloader/>*/}
    //         {/*</div>*/}
    //     )
    //     } else {
            return (
                <ul className="employee-list">
                    {this.state.employee.map(function (employee) {
                        return (
                            <li key={user.id}>
                                <Link to="{'/employee/' + employee.id}">{employee.name}</Link>
                            </li>

                        )
                    })}
                </ul>
            )
    }
  // }
}

export default EmployeeList
