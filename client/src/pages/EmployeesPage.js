import React, {Component} from 'react'
import axios from 'axios'
import Preloader from '../components/Preloader'
// import EmployeesFactory from "../components/";
import '../styles/Employee.css'
import EmployeesFactory from "../components/EmployeesFactory";

class EmployeesPage extends Component {

  componentDidMount() {
    axios.get('/employee')
      .then(response => {
        console.log(response.data)
        this.setState({employee: response.data})
      })
  }

  constructor(props) {
    super(props)
    this.state = {
      employee: []
    }
  }

  render() {
    const {employee} = this.state
    if (!this.state.employee) {
      return (
        <div>
          <Preloader/>
        </div>
      )
    } else {
      return (
        <div>
          <div>
            <EmployeesFactory/>
          </div>
          <div className='employee'>
            <div className='employee_container'>
              {employee.map(employee =>
                <div className='employeeList'>
                  <div className='employeeBlock'>
                    <div className='employeePhoto'>
                      <img alt='нет фото'
                           src="https://zabavnik.club/wp-content/uploads/Kartinka_3_26040225.png"/>
                    </div>
                    <div className='info_box'>
                      <h4>{employee.forename}&nbsp;
                        {employee.surname}&nbsp;
                        {employee.patronymic},&nbsp;
                        {employee.position.title}</h4>

                      <li>
                        <h4>{employee.phoneNumber}</h4>
                      </li>
                      <li>
                        <h4>{employee.info}</h4>
                      </li>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )

    }
  }
}

export default EmployeesPage
