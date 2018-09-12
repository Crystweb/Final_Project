import React, {Component, Fragment} from 'react'
import {Link} from 'react-router-dom'
import axios from 'axios'
import Modal from "react-responsive-modal";
import VacanciesList from "../components/VacanciesList";
import Preloader from '../components/Preloader'

class EmployeeList extends Component {

    onOpenModal = () => {
        this.setState({open: true})
    }
    onCloseModal = () => {
        this.setState({open: false})
    }
    componentDidMount() {
        axios.get('/employee')
            .then(response => this.setState({employee: response.data}))
    }
    // handleSubmit = event => {
    //     //     event.preventDefault()
    //     //     axios({
    //     //         url: '/vacancy',
    //     //         method: 'POST',
    //     //         data: {
    //     //             vacancy: {
    //     //                 position: this.state.position,
    //     //                 info: this.state.info,
    //     //                 salary: this.state.salary
    //     //             }
    //     //         }
    //     //
    //     //     }).then(() => this.setState({open: false}))
    //     // }

    constructor(props) {
        super(props)
        this.state = {
            employee: [],
            open: false
        }
        this.handlePositionChange = this.handlePositionChange.bind(this)
        this.handleSalaryChange = this.handleSalaryChange.bind(this)
        this.handleInfoChange = this.handleInfoChange.bind(this)
    }

    handlePositionChange (event) {
        event.preventDefault()
        this.setState({position: event.target.value})
    }

    handleSalaryChange (event) {
        event.preventDefault()
        this.setState({salary: event.target.value})
    }

    handleInfoChange (event) {
        event.preventDefault()
        this.setState({info: event.target.value})
    }



    render() {
        // const {employee} = this.state
        // if (!this.state.date)
        //     return (
        //         <div>
        //             <Preloader/>
        //         </div>
        //     )
        // } else {
            return (
                <section>
                    <Fragment>
                        <div className="button-container" id="button">
                            <button onClick={this.onOpenModal}>Добавить вакансию</button>
                            <Modal onClose={this.onCloseModal} center
                                   closeOnOverlayClick={true}>
                                <form onSubmit={this.handleSubmit}>
                                    <label>
                                        Название должности:
                                        <input type="text" name={"position"} value={this.state.position}
                                               onChange={this.handlePositionChange}/>
                                        Зарплата:
                                        <input type="text" name={"salary"} value={this.state.salary}
                                               onChange={this.handleSalaryChange}/>
                                        <br/>
                                        <textarea placeholder={'Введите Ваш коментарий'} name={"info"}
                                                  value={this.state.info}
                                                  onChange={this.handleInfoChange}/>
                                    </label>
                                    <input type="submit" value="Добавить"/>
                                </form>
                            </Modal>
                        </div>
                    </Fragment>

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
                </section>


            )
        }
    }



export default EmployeeList
