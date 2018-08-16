import React, {Component} from 'react'
// import {connect} from "react-redux";
import {addEmployees} from "../actions/actions";
import {getEmployees} from "../utils/Utills";

class EmployeeList extends Component {

    componentDidMount () {
        getEmployees(data => {
            this.props.addEmployees(data)
        })
    }

    render() {
        return (
            <ul className="employee-list">
       {/*         {this.props.Employee.map( Employee => {
                return (
                    <li key={employees.emloyeesList}>
                    </li>
                );
            })}*/}
            </ul>
        );
    }
}
/*const mapStateToProps = (state) => {
    return {
        emloyeesList: new state.employees.employeesList
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        addEmployees: (data) => {
            dispatch(addEmployees(data))
        }
    }
};*/

export default EmployeeList;