import React, {Component} from 'react'
import axios from 'axios'
import Preloader from '../components/Preloader'
import EmployeeAdd from "../components/EmployeeAdd";

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
                        <EmployeeAdd />
                    </div>
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
                </div>
            )

        }
    }
}
export default EmployeeList
