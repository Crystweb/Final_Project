import React, {Component} from 'react'
import axios from 'axios'
import Preloader from '../../components/Preloader'
import EmployeeAdd from "../../components/EmployeeAdd";
import '../../styles/Employee.css'
import {Link} from "react-router-dom";
import routes from "../../constants/routes";
import update from "../../img/update.png";
import trash from "../../img/trash.png";
import connect from "react-redux/es/connect/connect";
import {getEmployee} from "../../utils/utils";
import {addEmployee} from "../../actions/actions";

class EmployeeList extends Component {

  componentDidMount() {
    getEmployee(data => {
      this.props.addEmployee(data)
    })
  }

  deleteEmployee(id) {
    if (window.confirm('Вы уверены, что хотите удалить сотрудника?')) {
      axios.delete(`/employee/${id}`)
        .then(() => getEmployee(data => {
          this.props.addEmployee(data)
        }))
    }
  }

  render() {

    if(!this.props.employee)
    {
      return (
        <div>
          <Preloader/>
        </div>
      )
    }
  else
    {
      const {employee} = this.props
      return (
        <div>
          <div>
            <EmployeeAdd/>
          </div>
          <div className='employee'>
            <div className='employee_container'>
              {employee.map(employee =>
                <div className='employeeList' key={employee.id}>
                  <div className='employeeBlock'>
                    <div className='employeePhoto'>
                      <img alt='нет фото'
                           src="https://zabavnik.club/wp-content/uploads/Kartinka_3_26040225.png"/>
                    </div>
                    <div className='info_box'>
                      <h4>{employee.forename}&nbsp;
                        {employee.surname}&nbsp;
                        {employee.patronymic},&nbsp;
                      </h4>

                      <h4>{employee.position.title} </h4>

                      <h4>{employee.phoneNumber}</h4>

                      <h4>{employee.info}</h4>
                    </div>
                    <div className='ud_buttons'>

                      <button onClick={() => this.deleteEmployee(employee.id)}><img
                        alt='trash' src={trash}/>
                      </button>

                      <button><Link to={routes.updateEmployee.href + employee.id}><img
                        alt='update' src={update}/></Link>
                      </button>
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

const mapStateToProps = ({employees, startData}) => {
  return {
    employee: employees.employeesList,
    user: startData.currentUser
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    addEmployee: (data) => {
      dispatch(addEmployee(data))
    }
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(EmployeeList)
