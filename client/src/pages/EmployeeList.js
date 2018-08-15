import React, {Component} from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import {connect} from "react-redux";
import {addEmployees} from "../actions/actions";

class EmployeeList extends Component {

    componentDidMount() {
      axios.get('/employees')
        .then(response => {
             this.props.addEmployees(response.data)})
    }

    render() {
      return (
        <ul className="employee-list">
          {this.props.employeesList.map( employees => {
            return (
              <li key={employees.u_id}>
              </li>
            );
          })}
        </ul>
      );
    }
}

const mapStateToProps = (state) => {
    return {
        emloyeesList: state.employees.employeesList
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        addEmployees: (data) => {
            dispatch(addEmployees(data))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps) (EmployeeList)