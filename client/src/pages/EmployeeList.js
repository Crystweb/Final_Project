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
                  <h2>Списоk сотрудников: </h2>
                  {employee.map(employee =>
                      <ul className='vacancyList'>
                          <li>
                              <h4>position: <i> {employee.position}</i></h4>
                          </li>
                          <li>
                              <h4>forename: <i>{employee.forename}</i></h4>
                          </li>
                          <li>
                              <h4>surname: <i>{employee.surname}</i></h4>
                          </li>
                          <li>
                              <h4>patronymic: <i>{employee.patronymic}</i></h4>
                          </li>
                          <li>
                              <h4>Phone number: <i>{employee.phoneNumber}</i></h4>
                          </li>
                          <li>
                              <h4>info: <i>{employee.info}</i></h4>
                          </li>
                      </ul>
                  )}
              </div>
          )
      }
  }


export default EmployeeList
