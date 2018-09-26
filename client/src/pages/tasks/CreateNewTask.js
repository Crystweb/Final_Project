import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import Preloader from '../../components/Preloader'
import DatePicker from 'react-datepicker'
import moment from 'moment'
import 'react-datepicker/dist/react-datepicker.css'

class CreateNewTask extends Component {
  constructor (props) {
    super(props)
    const {allUsers, allLocations} = this.props
    this.state = {
      chosenLocation: allLocations[0].id,
      textForTask: null,
      taskPriority: 1,
      startDate: moment(),
      executorId: (allUsers && allUsers[0].id)
    }
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange (date) {
    this.setState({
      startDate: date
    })
  }

  chooseLocation = (event) => {
    this.setState({chosenLocation: event.target.value})
  }

  taskText = (event) => {
    this.setState({textForTask: event.target.value})
  }

  choosePriority = (event) => {
    this.setState({taskPriority: event.target.value})
  }

  chooseExecutor = (event) => {
    this.setState({executorId: event.target.value})
  }

  render () {
    const {allUsers, allLocations, allStatuses, allFrequencies} = this.props
    console.log(this.state.taskPriority)

    if (allUsers && allLocations && allStatuses && allFrequencies) {
      return (
        <Fragment>
          <div className="container createTask">
            <label htmlFor='location'>Локация</label>
            <select
              id='location'
              onChange={this.chooseLocation.bind(this)}>
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
            <label htmlFor="priority">Приоритет</label>
            <select
              id="priority"
              onChange={this.choosePriority.bind(this)}>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
            </select>
            <p>Выполнить до</p>
            <DatePicker
              minDate={moment()}
              selected={this.state.startDate}
              onChange={this.handleChange}
            />
            <label htmlFor="forThatUser">Исполнитель</label>
            <select
              id='forThatUser'
              onChange={this.chooseExecutor.bind(this)}>
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
            <label htmlFor="frequency">Повтор</label>
            <select
              id='frequency'>
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
            <textarea
              name="task"
              id="task"
              cols="30"
              rows="10"
              placeholder='Введите текст'
              onChange={this.taskText.bind(this)}
            >{this.state.textForTask}</textarea>
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

export default connect(mapStateToProps)(CreateNewTask)
