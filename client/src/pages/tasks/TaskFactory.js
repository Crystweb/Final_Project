import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import Preloader from '../../components/Preloader'
import axios from 'axios'
import moment from 'moment'
import 'react-datepicker/dist/react-datepicker.css'
import DatePicker from 'react-datepicker'
import * as _ from 'lodash'
import '../../styles/Tasks.css'
import { addNewTask } from '../../actions/actions'

class TaskFactory extends Component {
  constructor (props) {
    super(props)
    this.state = {
      taskPriority: null,
      finishDate: null,
      executorId: null,
      frequency: null,
      errorExecutor: null,
      errorText: null,
      errorLocation: null,
      errorFrequency: null,
      errorRoom: null,
      successAdd: null,
      photo: null,
      itIsFloor: false
    }
    this.handleChange = this.handleChange.bind(this)
    this.choosePriority = this.choosePriority.bind(this)
    this.chooseExecutor = this.chooseExecutor.bind(this)
    this.chooseFrequency = this.chooseFrequency.bind(this)
    this.makePhoto = this.makePhoto.bind(this)
    this.createTask = this.createTask.bind(this)
    this.floorChecker = this.floorChecker.bind(this)
  }

  handleChange (day) {
    this.setState({
      finishDate: day
    })
  }

  floorChecker = (event) => {
    this.setState({
      itIsFloor: false
    })
    let taskForRoomCheckIn = this.props.allLocations.find(location => location.id === +event.target.value)
    if (taskForRoomCheckIn.children.length > 0) {
      this.setState({itIsFloor: true})
    }
  }

  choosePriority = (event) => {
    this.setState({
      taskPriority: event.target.value
    })
  }

  chooseExecutor = (event) => {
    this.setState({
      executorId: event.target.value
    })
  }

  chooseFrequency = (event) => {
    this.setState({
      frequency: event.target.value
    })
  }

  makePhoto = (event) => {
    this.setState({photo: event.target.files[0]})
  }

  createTask = () => {
    const {taskPriority, finishDate, executorId, frequency, photo} = this.state
    const {allLocations, allUsers} = this.props
    if (Number.isNaN(this.locationId.value)) {
      this.setState({
        errorLocation: 'Выберите локацию'
      })
    }
    if (this.roomId && Number.isNaN(this.roomId.value)) {
      this.setState({
        errorRoom: 'Выберите номер'
      })
    }
    if (_.isEmpty(executorId)) {
      this.setState({
        errorExecutor: 'Выберите отвественного'
      })
    }
    if (_.isEmpty(frequency)) {
      this.setState({
        errorFrequency: 'Укажите повторяемость'
      })
    }
    if (!this.textForTask.value) {
      this.setState({
        errorText: 'Введите текст'
      })
    }
    if (this.textForTask.value && !_.isEmpty(frequency) && !_.isEmpty(executorId) && +this.locationId.value) {
      let location = ((this.roomId && this.roomId.value) && allLocations.find(location => location.id === +this.locationId.value).children) || allLocations
      let locationId = (this.roomId && +this.roomId.value) || +this.locationId.value
      let body = {
        assignee: allUsers.find(user => user.id === +executorId).employee,
        message: this.textForTask.value,
        status: 'OPENED',
        updated: new Date(),
        frequency: frequency,
        expired: finishDate,
        priority: taskPriority,
        locations: [location.find(location => location.id === locationId)]
      }
      let formData = new FormData()
      formData.append('task', JSON.stringify(body))
      if (photo) {
        formData.append('file', photo)
      }
      axios({
        method: 'post',
        url: `/task`,
        data: formData
      })
        .then((response) => this.props.addTask(response.data))
        .then(() => {
          this.setState({
            successAdd: 'Задача добавлена'
          })
        })
        .then(() => this.props.history.push('/tasks'))
    }
  }

  render () {
    console.log(this.locationId && this.locationId.value)

    const {allUsers, allLocations, allStatuses, allFrequencies} = this.props
    const {
      finishDate,
      executorId,
      frequency,
      errorExecutor,
      errorText,
      errorLocation,
      errorFrequency,
      errorRoom,
      successAdd,
      itIsFloor
    } = this.state

    if (allUsers && allLocations && allStatuses && allFrequencies) {
      return (
        <div className="container createTask">
          <select
            name='locationsList'
            defaultValue='locationChoice'
            onChange={this.floorChecker}
            ref={(input) => this.locationId = input}
          >
            <option
              value="locationChoice"
              disabled
              hidden>
              Локация
            </option>
            {allLocations.map(location => {
              return (
                <option
                  value={location.id}
                  key={location.id}>
                  {location.title}
                </option>
              )
            })}
          </select>
          {this.locationId && +this.locationId.value ||
          <label className='task_errors' htmlFor='locationsList'>{errorLocation}</label>}
          {
            itIsFloor &&
            <Fragment>
              <select
                name="roomsList"
                defaultValue='roomChoice'
                id="rooms"
                ref={(input) => this.roomId = input}
              >
                <option
                  value='roomChoice'
                  disabled
                  hidden>
                  Номер
                </option>
                {allLocations.find(location => location.id === +this.locationId.value).children.map(children => {
                  return (
                    <option
                      value={children.id}
                      key={children.id}
                    >
                      {children.title}
                    </option>
                  )
                })}
              </select>
              {!!(this.roomId && +this.roomId.value) ||
              <label className='task_errors' htmlFor='roomsList'>{errorRoom}</label>}
            </Fragment>
          }
          <select
            defaultValue='0'
            id="priority"
            onChange={this.choosePriority}>
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
          <DatePicker
            placeholderText='Выполнить до'
            minDate={moment()}
            selected={finishDate}
            onChange={this.handleChange}
          />
          <select
            name='executors'
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
                  {user.employee.forename} {user.employee.forename}, {user.employee.position.title}
                </option>
              )
            })}
          </select>
          {!!executorId ||
          <label className='task_errors' htmlFor='executors'>{errorExecutor}</label>}
          <select
            name='frequencies'
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
          {!!frequency ||
          <label className='task_errors' htmlFor='frequencies'>{errorFrequency}</label>}
          <textarea
            name="task"
            id="task"
            cols="30"
            rows="10"
            ref={(input) => this.textForTask = input}
            placeholder='Введите текст'
          >
          </textarea>
          {(this.textForTask && !!this.textForTask.value) || <label className='task_errors' htmlFor='task'>{errorText}</label>}
          <input
            type="file"
            name="audio"
            accept="image/*"
            onChange={this.makePhoto}
          />
          <button
            onClick={this.createTask}>Создать
          </button>
          {successAdd && <h3>{successAdd}</h3>}
        </div>
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
    addTask: (data) => {
      dispatch(addNewTask(data))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TaskFactory)
