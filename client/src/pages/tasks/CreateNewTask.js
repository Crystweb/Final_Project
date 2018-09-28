import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import Preloader from '../../components/Preloader'
import axios from 'axios'
import moment from 'moment'
import 'react-datepicker/dist/react-datepicker.css'
import DatePicker from 'react-datepicker'
import * as _ from 'lodash'

class CreateNewTask extends Component {
  constructor (props) {
    super(props)
    const {allLocations} = this.props
    this.state = {
      chosenLocation: allLocations[0].id,
      textForTask: null,
      taskPriority: null,
      finishDate: null,
      executorId: null,
      frequency: 'ONCE',
      errorExecutor: null,
      errorText: null
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
    this.setState({
      textForTask: event.target.value,
      errorText: null
    })
  }

  choosePriority = (event) => {
    this.setState({taskPriority: event.target.value})
  }

  chooseExecutor = (event) => {
    this.setState({
      executorId: event.target.value,
      errorExecutor: null
    })
  }

  chooseFrequency = (event) => {
    this.setState({frequency: event.target.value})
  }

  createTask = () => {
    const {chosenLocation, textForTask, taskPriority, finishDate, executorId, frequency} = this.state
    if (_.isEmpty(executorId)) {
      this.setState({errorExecutor: 'Выберите отвественного'})
    }
    if (_.isEmpty(textForTask)) {
      this.setState({errorText: 'Введите текст'})
    } else {
      let body = {
        assignee: this.props.allUsers.find(user => user.id === +executorId),
        message: textForTask,
        status: 'OPENED',
        updated: new Date(),
        frequency: frequency,
        expired: finishDate,
        priority: taskPriority,
        locations: [this.props.allLocations.find(location => location.id === +chosenLocation)]
      }
      axios({
        method: 'post',
        url: '/task',
        data: body
      }).then(() => {
        this.setState({
          errorExecutor: null,
          errorText: null
        })
      })
    }
  }

  render () {
    const {allUsers, allLocations, allStatuses, allFrequencies} = this.props

    if (allUsers && allLocations && allStatuses && allFrequencies) {
      return (
        <Fragment>
          <div className="container createTask">
            <select
              defaultValue='locationChoice'
              id='location'
              onChange={this.chooseLocation.bind(this)}>
              <option value="locationChoice"
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
            <select
              defaultValue='0'
              id="priority"
              onChange={this.choosePriority.bind(this)}>
              <option value="0"
                      disabled
                      hidden>
                приоритет
              </option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
            </select>
            <DatePicker
              placeholderText='Выполнить до'
              minDate={moment()}
              selected={this.state.finishDate}
              onChange={this.handleChange}
            />
            <select
              defaultValue='test'
              id='forThatUser'
              required={true}
              onChange={this.chooseExecutor.bind(this)}>
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
            <select
              defaultValue='frequencyChoice'
              id='frequency'
              onChange={this.chooseFrequency.bind(this)}
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
            <textarea
              name="task"
              id="task"
              cols="30"
              rows="10"
              placeholder='Введите текст'
              onChange={this.taskText.bind(this)}>
              {this.state.textForTask}
            </textarea>
            <input type="file" accept="image/*" capture/>
            <button
              onClick={this.createTask.bind(this)}>Создать
            </button>
            {this.state.errorExecutor && <h3>{this.state.errorExecutor}</h3>}
            {this.state.errorText && <h3>{this.state.errorText}</h3>}
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
