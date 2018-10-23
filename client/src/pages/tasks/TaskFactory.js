import React, { Component } from 'react'
import { connect } from 'react-redux'
import Preloader from '../../components/Preloader'
import axios from 'axios'
import moment from 'moment'
import * as _ from 'lodash'
import 'react-datepicker/dist/react-datepicker.css'
import DatePicker from 'react-datepicker'
import '../../styles/Tasks.css'
import { addNewTask } from '../../actions/actions'

class TaskFactory extends Component {
  constructor (props) {
    super(props)
    this.locationId = React.createRef()
    this.textForTask = React.createRef()
    this.roomId = React.createRef()
    this.executorId = React.createRef()
    this.taskPriority = React.createRef()
    this.taskFrequency = React.createRef()
    this.state = {
      finishDate: null,
      errorExecutor: null,
      errorText: null,
      errorLocation: null,
      errorFrequency: null,
      errorRoom: null,
      successAdd: null,
      photo: null,
      itIsFloor: false
    }
    _.bindAll(this, 'chooseDate', 'makePhoto', 'createTask', 'floorChecker')
  }

  chooseDate (day) {
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

  makePhoto = (event) => {
    this.setState({photo: event.target.files[0]})
  }

  createTask = () => {
    const {locationId, textForTask, roomId, executorId, taskPriority, taskFrequency} = this
    const {finishDate, photo} = this.state
    const {allLocations, allUsers} = this.props
    if (isNaN(locationId.value)) {
      this.setState({
        errorLocation: 'Выберите локацию'
      })
    }
    if (this.roomId && isNaN(this.roomId.value)) {
      this.setState({
        errorRoom: 'Выберите номер'
      })
    }
    if (isNaN(executorId.value)) {
      this.setState({
        errorExecutor: 'Выберите отвественного'
      })
    }
    if (!isNaN(taskFrequency.value)) {
      this.setState({
        errorFrequency: 'Укажите повторяемость'
      })
    }
    if (!textForTask.value) {
      this.setState({
        errorText: 'Введите текст'
      })
    }
    if (textForTask.value && isNaN(taskFrequency.value) && +executorId.value && +locationId.value) {
      let locations = ((roomId && +roomId.value) && allLocations.find(location => location.id === +locationId.value).children) ||
        allLocations
      let locationType = (roomId && +roomId.value) || (locationId && +locationId.value)
      let body = {
        assignee: allUsers.find(user => user.id === +executorId.value).employee,
        message: textForTask.value,
        status: 'OPENED',
        updated: new Date(),
        frequency: taskFrequency.value,
        expired: finishDate,
        priority: taskPriority.value,
        locations: [locations.find(location => location.id === locationType)]
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

  componentDidMount () {
    const {floorId, roomId} = this.props.match.params
    if (floorId) {
      this.locationId.value = floorId
    }
  }

  render () {
    const {allUsers, allLocations, allStatuses, allFrequencies} = this.props
    const {floorId, roomId} = this.props.match.params
    const {
      finishDate,
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
            // onChange={this.floorChecker}
            ref={(input) => this.locationId = input}
            disabled={!!floorId}
          >
            <option value="locationChoice" disabled hidden>
              Локация
            </option>
            {allLocations.map(location => {
              return (
                <option value={location.id} key={location.id}>
                  {location.title}
                </option>
              )
            })}
          </select>
          {isNaN(this.locationId.value) &&
          <label className='task_errors' htmlFor='locationsList'>{errorLocation}</label>}
          {(itIsFloor || !!roomId) &&
          <div>
            <select name="roomsList" defaultValue='roomChoice' ref={(input) => this.roomId = input}
            >
              <option value='roomChoice' disabled hidden>
                Номер
              </option>
              {allLocations.find(location => location.id === +this.locationId.value).children.map(children => {
                return (
                  <option value={children.id} key={children.id}>
                    {children.title}
                  </option>
                )
              })}
            </select>
            {(this.roomId && isNaN(this.roomId.value)) &&
            <label className='task_errors' htmlFor='roomsList'>{errorRoom}</label>}
          </div>
          }
          <select defaultValue='0' id="priority" ref={input => this.taskPriority = input}>
            <option value="0" disabled hidden>
              приоритет
            </option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
          </select>
          <DatePicker
            placeholderText='Срок выполнения'
            minDate={moment()}
            selected={finishDate}
            showMonthDropdown
            useShortMonthInDropdown
            showTimeSelect
            withPortal
            dateFormat="LLL"
            onChange={this.chooseDate}
            popperModifiers={{
              offset: {
                enabled: true,
                offset: '5px, 10px'
              },
              preventOverflow: {
                enabled: true,
                escapeWithReference: false, // force popper to stay in viewport (even when input is scrolled out of view)
                boundariesElement: 'viewport'
              }
            }}
          />
          <select
            name='executors'
            defaultValue='test'
            required={true}
            ref={input => this.executorId = input}>
            <option disabled hidden value='test'>
              Исполнитель
            </option>
            {allUsers.map(user => {
              return (
                <option value={user.id} key={user.id}>
                  {user.employee.forename} {user.employee.forename}, {user.employee.position.title}
                </option>
              )
            })}
          </select>
          {isNaN(this.executorId.value) &&
          <label className='task_errors' htmlFor='executors'>{errorExecutor}</label>}
          <select name='frequencies' defaultValue='0' ref={(input) => this.taskFrequency = input}>
            <option value='0' hidden disabled>
              Повторяемость
            </option>
            {allFrequencies.map(frequency => {
              return (
                <option value={frequency} key={frequency}>
                  {frequency}
                </option>
              )
            })}
          </select>
          {!isNaN(this.taskFrequency.value) &&
          <label className='task_errors' htmlFor='frequencies'>{errorFrequency}</label>}
          <textarea
            name="task"
            cols="30"
            rows="10"
            ref={input => this.textForTask = input}
            placeholder='Введите текст'
          >
          </textarea>
          {this.textForTask.value ||
          <label className='task_errors' htmlFor='task'>{errorText}</label>}
          <input type="file" accept="image/*" onChange={this.makePhoto}/>
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
