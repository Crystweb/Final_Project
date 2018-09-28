import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import Preloader from '../../components/Preloader'
import axios from 'axios'
import moment from 'moment'
import 'react-datepicker/dist/react-datepicker.css'
import DatePicker from 'react-datepicker'

class CreateNewTask extends Component {
  constructor (props) {
    super(props)
    const {allLocations} = this.props
    this.state = {
      chosenLocation: allLocations[0],
      textForTask: null,
      taskPriority: null,
      finishDate: moment(),
      executorId: null,
      frequency: 'ONCE'
    }
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange (day) {
    this.setState({
      finishDate: day
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

  chooseFrequency = (event) => {
    this.setState({frequency: event.target.value})
  }

  createTask = () => {
    let body = {
      assignee: this.props.allUsers.find(user => user.id === +this.state.executorId),
      message: this.state.textForTask,
      status: 'OPENED',
      frequency: this.state.frequency,
      expired: this.state.finishDate,
      priority: this.state.taskPriority,
      locations: [this.state.chosenLocation]
    }
    axios({
      method: 'post',
      url: '/task',
      data: body
    })
  }

  render () {
    const {allUsers, allLocations, allStatuses, allFrequencies} = this.props
    console.log(this.state.finishDate)

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
                    value={location}
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
              <option value="0">0</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
            </select>
            <p>Выполнить до</p>
            <DatePicker
              selected={this.state.finishDate}
              onChange={this.handleChange}
            />
            <select
              id='forThatUser'
              required={true}
              onChange={this.chooseExecutor.bind(this)}>
              <option
                disabled
                hidden
                selected>Исполнитель
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
            <label htmlFor="frequency">Повтор</label>
            <select
              id='frequency'
              onChange={this.chooseFrequency.bind(this)}
            >
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
              onChange={this.taskText.bind(this)}>
              {this.state.textForTask}
            </textarea>
            <button onClick={this.createTask.bind(this)}>Создать</button>
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
