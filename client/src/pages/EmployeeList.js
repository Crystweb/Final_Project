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
    //   {/*<Preloader/>*/}
    //   {/*</div>*/}
    //     )
    //     } else {
//             return (
// //                 <ul className="employee-list">
// //                     {this.state.employee.map(function (employee) {
// //                         return (
// //                             <li key={employee.id}>
// //                                 <Link to="{'/employee/' + employee.id}">{employee.name}</Link>
// //                             </li>
// //
// //                         )
// //                     })}
// //                 </ul>
// //             )
// //     }
// //   // }
// // }

      const {employee} = this.state
      // if (!this.state.date) {
      //     return (
      //         <div>
      //             <Preloader/>
      //         </div>
      //     )
      // } else {
          return (
              <div>
                  Списоk employee:
                  {employee.map(employee =>
                      <ul className='employeeList'>
                          <li>
                              <h3>{employee.position}</h3>
                          </li>
                          <li>
                              <h3>{employee.forename}</h3>
                          </li>
                          <li>
                              <h3>{employee.surname}</h3>
                          </li>
                          <li>
                              <h3>{employee.patronymic}</h3>
                          </li>
                          <li>
                              <h3>{employee.phoneNumber}</h3>
                          </li>
                          <li>
                              <h3>{employee.info}</h3>
                          </li>
                      </ul>
                  )}
              </div>
          )
      }
  }


export default EmployeeList
