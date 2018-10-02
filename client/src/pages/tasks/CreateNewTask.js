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
    this.state = {
      chosenLocation: null,
      textForTask: null,
      taskPriority: null,
      finishDate: null,
      executorId: null,
      frequency: null,
      errorExecutor: null,
      errorText: null,
      errorLocation: null,
      errorFrequency: null,
      successAdd: null,
      photo: null
    }
    this.handleChange = this.handleChange.bind(this)
    this.chooseLocation = this.chooseLocation.bind(this)
    this.taskText = this.taskText.bind(this)
    this.choosePriority = this.choosePriority.bind(this)
    this.chooseExecutor = this.chooseExecutor.bind(this)
    this.chooseFrequency = this.chooseFrequency.bind(this)
    this.makePhoto = this.makePhoto.bind(this)
    this.createTask = this.createTask.bind(this)
    this.chooseLocation = this.chooseLocation.bind(this)
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

  makePhoto = (event) => {
    this.setState({photo: event.target.files[0]})
  }

  createTask = () => {
    const {chosenLocation, textForTask, taskPriority, finishDate, executorId, frequency, photo} = this.state
    if (_.isEmpty(chosenLocation)) {
      this.setState({
        errorText: null,
        successAdd: null,
        errorExecutor: null,
        errorFrequency: null,
        errorLocation: 'Выберите локацию'
      })
    } else {
      if (_.isEmpty(executorId)) {
        this.setState({
          errorLocation: null,
          errorText: null,
          successAdd: null,
          errorFrequency: null,
          errorExecutor: 'Выберите отвественного'
        })
      } else {
        if (_.isEmpty(frequency)) {
          this.setState({
            errorLocation: null,
            errorExecutor: null,
            successAdd: null,
            errorText: null,
            errorFrequency: 'Укажите повторяемость'
          })
        } else {
          if (_.isEmpty(textForTask)) {
            this.setState({
              errorLocation: null,
              errorExecutor: null,
              successAdd: null,
              errorFrequency: null,
              errorText: 'Введите текст'
            })
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
            let newPhoto = photo
            console.log(newPhoto)
            axios({
              method: 'post',
              url: `/task`,
              params: {file: newPhoto},
              data: body
            })
              .then(() => {
                this.setState({
                  errorLocation: null,
                  errorExecutor: null,
                  errorText: null,
                  errorFrequency: null,
                  successAdd: 'Задача добавлена'
                })
              })
              .then(() => { setTimeout(() => this.props.history.push('/'), 1500) })
          }
        }
      }
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
              onChange={this.chooseLocation}>
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
              onChange={this.choosePriority}>
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
              onChange={this.chooseExecutor}>
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
              onChange={this.chooseFrequency}
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
              onChange={this.taskText}>
              {this.state.textForTask}
            </textarea>
            <input
              type="file"
              name="audio"
              accept="image/*"
              onChange={this.makePhoto}
            />
            <button
              onClick={this.createTask}>Создать
            </button>
            {this.state.errorExecutor && <h3>{this.state.errorExecutor}</h3>}
            {this.state.errorLocation && <h3>{this.state.errorLocation}</h3>}
            {this.state.errorText && <h3>{this.state.errorText}</h3>}
            {this.state.errorFrequency && <h3>{this.state.errorFrequency}</h3>}
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

export default connect(mapStateToProps)(CreateNewTask)
