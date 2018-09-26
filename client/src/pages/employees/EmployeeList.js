import React, {Component} from 'react'
import axios from 'axios'
import Preloader from '../../components/Preloader'
import EmployeeAdd from "../../components/EmployeeAdd";
import '../../styles/Employee.css'
import {Link} from "react-router-dom";
import routes from "../../constants/routes";
import update from "../../img/update.png";
import trash from "../../img/trash.png";
import {getLastShift} from "../../utils/utils";

class EmployeeList extends Component {

    componentDidMount() {
        axios.get('/employee')
            .then(response => this.setState({employee: response.data}))
    }

    constructor(props) {
        super(props)
        this.state = {
            employee: []
        }
    }

    deleteEmployee(id) {
        if (window.confirm('Вы уверены, что хотите удалить сотрудника?')) {
            axios.delete(`/employee/${id}`)
                .then(() => getLastShift(data => {
                    this.props.addShift(data)
                }))
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
                        <EmployeeAdd/>
                    </div>
                    <div className='employee'>
                        <h2>СОТРУДНИКИ</h2>
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
                                                {employee.position}</h4>

                                            <li>
                                                <h4>{employee.phoneNumber}</h4>
                                            </li>
                                            <li>
                                                <h4>{employee.info}</h4>
                                            </li>
                                            <div className='ud_buttons'>

                                                <button onClick={() => this.deleteEmployee(employee.id)}><img alt='trash' src={trash}/>
                                                </button>

                                                <button><Link to={routes.updateEmployee.href + employee.id}><img alt='update' src={update}/></Link>
                                                </button>
                                            </div>
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

export default EmployeeList
