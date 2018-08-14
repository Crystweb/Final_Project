import React, {Component} from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

class EmployeeList extends Component {

    constructor(props) {
        super(props)
      this.state = {
        users: []
      }
    }

    componentDidMount() {
      axios.get('http://localhost:9000/employee')
        .then(response => this.setState({users: response}))
    }

    render() {
      return (
        <ul className="employee-list">
          {this.state.users.map(function(user) {
            return (
              <li key={user.id}>
                <Link to="{'/users/' + user.id}">{user.name}</Link>
              </li>
            );
          })}
        </ul>
      );
    }
}
export default EmployeeList