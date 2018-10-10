import React, {Component, Fragment} from 'react'
import {connect} from 'react-redux'
import Preloader from '../../components/Preloader'
import 'react-datepicker/dist/react-datepicker.css'
import * as _ from 'lodash'
import '../../styles/Tasks.css'
import {addEmployee, addNewEmployee} from '../../actions/actions'

class CreateNewEmployee extends Component {
    constructor(props) {
        super(props)
        this.state = {
            employee: [],
            position: null,
            forename: null,
            surname: null,
            patronymic: null,
            phoneNumber: null,
            info: null,
            photo: null,
            errorPosition: null,
            errorForename: null,
            errorSurname: null,
            errorPatronymic: null,
            errorPhoneNumber: null,
            successAdd: null

        }
        this.handleChange = this.handleChange.bind(this)
        this.choosePosition = this.choosePosition.bind(this)
        this.inputForename = this.inputForename.bind(this)
        this.inputSurname = this.inputSurname.bind(this)
        this.inputPatronymic = this.inputPatronymic.bind(this)
        this.inputPhoneNumber = this.inputPhoneNumber.bind(this)
        this.inputInfo = this.inputInfo.bind(this)
        // this.makePhoto = this.makePhoto.bind(this)
        this.createEmployee = this.createEmployee.bind(this)
    }

    choosePosition = (event) => {
        this.setState({
            chosenPosition: event.target.value,
            errorPosition: null
        })
    }

    inputForename = (event) => {
        this.setState({
            inputForename: event.target.value,
            errorForename: null
        })
    }

    inputSurname = (event) => {
        this.setState({
            inputSurname: event.target.value,
            errorSurname: null
        })
    }

    inputPatronymic = (event) => {
        this.setState({
            inputPatronymic: event.target.value,
            errorPatronymic: null
        })
    }

    inputPhoneNumber = (event) => {
        this.setState({
            inputPhoneNumber: event.target.value,
            errorPhoneNumber: null
        })
    }

    inputInfo = (event) => {
        this.setState({
            inputInfo: event.target.value,
        })
    }

    // makePhoto = (event) => {
    //      this.setState({photo: event.target.files[0]})
    // }

    createEmployee = () => {
        const {chosenPosition, inputForename, inputSurname, inputPatronymic, inputPhoneNumber} = this.state
        if (_.isEmpty(chosenPosition)) {
            this.setState({
                errorPosition: 'Выберите '
            })
        }
        if (_.isEmpty(inputForename)) {
            this.setState({
                errorForename: 'Введите имя'
            })
        }
        if (_.isEmpty(inputSurname)) {
            this.setState({
                errorSurname: 'Введите фамилию'
            })
        }
        if (_.isEmpty(inputPatronymic)) {
            this.setState({
                errorPatronymic: 'Введите отчество'
            })
        }
        if (_.isEmpty(inputPhoneNumber)) {
            this.setState({
                errorPhoneNumber: 'Введите номер телефона'
            })
        }
            }

    componentWillMount() {
        const {AddEmployee} = this.props;
        let data = this.props.employee;

        AddEmployee()
        this.setState({employee: data})
    }

    componentDidMount () {
        const {AddEmployee} = this.props
        let data = this.props.employee

        AddEmployee()
        this.setState({employee: data})
    }

    render() {
        const {allUsers, allLocations, allStatuses, allFrequencies} = this.props

        if (allUsers && allLocations && allStatuses && allFrequencies) {
            return (
                <Fragment>
                    <div className="container createTask">
                        <select
                            name='locationsList'
                            defaultValue='locationChoice'
                            id='location'
                            onChange={this.choosePosition}>
                            <option
                                value="locationChoice"
                                disabled
                                hidden>
                                Локация
                            </option>
                            {allLocations.map(location => {
                                return (
                                    <option
                                        type='text'
                                        name='location'
                                        value={location.id}
                                        key={location.id}>
                                        {location.title}
                                    </option>
                                )
                            })}
                        </select>
                        {this.state.errorPosition &&
                        <label className='task_errors' htmlFor='locationsList'>{this.state.errorPosition}</label>}
                        <select
                            defaultValue='0'
                            id="priority"
                            onChange={this.inputSurname}>
                            <option
                                value="0"
                                disabled
                                hidden>
                                приоритет
                            </option>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                        </select>

                        <select
                            name='executors'
                            defaultValue='test'
                            id='forThatUser'
                            required={true}
                            onChange={this.inputPatronymic}>
                            <option
                                disabled
                                hidden
                                value='test'>Исполнитель
                            </option>
                            {allUsers.map(user => {
                                return (
                                    <option
                                        value={user.id}
                                        key={user.id}>
                                        {user.employee.forename} {user.employee.forename}, {user.position.title}
                                    </option>
                                )
                            })}
                        </select>
                        {this.state.errorPatronymic &&
                        <label className='task_errors' htmlFor='executors'>{this.state.errorPatronymic}</label>}
                        <select
                            name='frequencies'
                            defaultValue='frequencyChoice'
                            id='frequency'
                            onChange={this.inputPhoneNumber}
                        >
                            <option
                                value="frequencyChoice"
                                hidden
                                disabled>
                                Повторяемость
                            </option>
                            {allFrequencies.map(frequency => {
                                return (
                                    <option
                                        value={frequency}
                                        key={frequency}>
                                        {frequency}
                                    </option>
                                )
                            })}
                        </select>
                        {this.state.errorFrequency &&
                        <label className='task_errors' htmlFor='frequencies'>{this.state.errorFrequency}</label>}
                        <textarea
                            name="task"
                            id="task"
                            cols="30"
                            rows="10"
                            placeholder='Введите текст'
                            onChange={this.inputForename}>
              {this.state.inputForename}
            </textarea>
                        {this.state.errorForename &&
                        <label className='task_errors' htmlFor='task'>{this.state.errorForename}</label>}
                        <input
                            type="file"
                            name="audio"
                            accept="image/*"
                            onChange={this.makePhoto}
                        />
                        <button
                            onClick={this.createEmployee}>Создать
                        </button>
                        {this.state.successAdd && <h3>{this.state.successAdd}</h3>}
                    </div>
                </Fragment>
            )
        } else {
            return (
                <Preloader/>
            )
        }
    }
}

const mapStateToProps = ({startData}) => {
    return {
        allUsers: startData.users,
        allLocations: startData.locations,
        allStatuses: startData.statuses,
        allFrequencies: startData.frequencies
    }
}

const mapDispatchToProps = (dispatch) => {
  return {
      AddEmployee: (data) => {
        dispatch(addEmployee(data))
    }
  }
}

export default connect(mapStateToProps)(CreateNewEmployee)