import React, { Component } from 'react'
import { connect } from 'react-redux'
import Preloader from '../../components/Preloader'
import axios from 'axios'
import moment from 'moment'
import * as _ from 'lodash'
import 'react-datepicker/dist/react-datepicker.css'
import DatePicker from 'react-datepicker'
import '../../styles/Tasks.css'
import Select from 'react-select'

class TaskFactory extends Component {
  constructor (props) {
    super(props)
    this.textForTask = React.createRef()
    this.state = {
      finishDate: null,
      errorExecutor: null,
      errorText: null,
      errorLocation: null,
      errorFrequency: null,
      errorRoom: null,
      successAdd: null,
      photo: null,
      floorSelected: false,
      locationId: null,
      idForRoom: null,
      executorId: null,
      taskPriority: 0,
      taskFrequency: null,
      sendingData: false
    }
    _.bindAll(this, 'chooseDate', 'makePhoto', 'createTask', 'floorChecker')
  }

  componentDidMount () {
    const {floorId, roomId} = this.props.match.params
    if (floorId) {
      this.setState({
        locationId: +floorId,
        floorSelected: true,
        idForRoom: +roomId})
    }
  }

  chooseDate (day) {
    this.setState({
      finishDate: day
    })
  }

  floorChecker = (id) => {
    let {allLocations} = this.props
    this.setState({
      floorSelected: allLocations.filter(location => location.children.length > 0)
        .some(location => location.id === id)
    })
  }

  makePhoto = (event) => {
    this.setState({photo: event.target.files[0]})
  }

  changeErrorText = (event) => {
    this.setState({errorText: null})
  }

  createTask = () => {
    const {textForTask} = this
    const {finishDate, photo, idForRoom, executorId, taskPriority, taskFrequency, locationId, sendingData} = this.state
    const {allLocations, allUsers, roomId} = this.props

    if (!locationId) {
      this.setState({
        errorLocation: 'Выберите локацию'
      })
    }
    if (!idForRoom) {
      this.setState({
        errorRoom: 'Выберите номер'
      })
    }
    if (!executorId) {
      this.setState({
        errorExecutor: 'Выберите отвественного'
      })
    }
    if (!taskFrequency) {
      this.setState({
        errorFrequency: 'Укажите повторяемость'
      })
    }
    if (!textForTask.value) {
      this.setState({
        errorText: 'Введите текст'
      })
    }


    if (textForTask.value && taskFrequency && executorId && locationId && !sendingData) {
      let locations = (idForRoom && allLocations.find(location => location.id === locationId).children) ||
        allLocations
      let locationType = idForRoom || locationId
      let body = {
        assignee: allUsers.find(user => user.id === executorId).employee,
        message: textForTask.value,
        status: 'OPENED',
        updated: new Date(),
        frequency: taskFrequency,
        expired: finishDate,
        priority: taskPriority,
        locations: [locations.find(location => location.id === locationType)]
      }
      let formData = new FormData()
      formData.append('task', JSON.stringify(body))
      if (photo) {
        formData.append('file', photo)
      }
      this.setState({sendingData: true})

      axios({
        method: 'post',
        url: `/task`,
        data: formData
      })
        .then(() => {
          this.setState({
            successAdd: 'Задача добавлена',
            sendingData: false
          })
        })
        .then(() => roomId ? this.props.history.push(`/rooms/${roomId}`) : this.props.history.push(`/tasks`))
    }
  }

  render () {
    const {allUsers, allLocations, allStatuses, allFrequencies} = this.props
    const {floorId} = this.props.match.params
    const {
      finishDate,
      errorExecutor,
      errorText,
      errorLocation,
      errorFrequency,
      errorRoom,
      successAdd,
      floorSelected
    } = this.state

    const styles = {
      dropdownIndicator: (base, state) => ({
      }),
      placeholder: (base, state) => ({
      }),
      valueContainer: (base, state) => ({
      }),
      control: (base, state) => ({
      }),
      indicatorsContainer: (base, state) => ({
      }),
      input: (base, start) => ({
        display: 'flex',
        position: 'absolute',
        top: '4px'
      })
    }

    let optionsLocation = []
    /* eslint-disable */
    allLocations.map(location => {
      optionsLocation.push({value: location.id, label: location.title})
    })
    /* eslint-enable */

    const location = (
      <Select
        isDisabled={this.props.match.params.roomId && true}
        styles={styles}
        classNamePrefix="react-select"
        className="taskFactory__select"
        defaultValue="locationChoice"
        value={optionsLocation.find(location => location.value === this.state.locationId)}
        placeholder="Локация"
        onChange={value => {
          this.setState({
            locationId: value.value
          })
          this.floorChecker(value.value)
        }}
        options={optionsLocation}
      />
    )

    let optionsRoom = []
    /* eslint-disable */
    allLocations.some(location => location.id === (this.state.locationId || floorId)) &&
    allLocations.find(location => location.id === (this.state.locationId || floorId)).children.map(children => {
      optionsRoom.push({value: children.id, label: children.title})
    })
    /* eslint-enable */

    const rooms = (
      <Select
        isDisabled={this.props.match.params.roomId && true}
        styles={styles}
        classNamePrefix="react-select"
        className="taskFactory__select"
        defaultValue="roomChoice"
        value={optionsRoom.find(room => room.value === this.state.idForRoom)}
        onChange={value => this.setState({idForRoom: value.value})}
        name="roomsList"
        placeholder="Номер"
        options={optionsRoom}
      />
    )

    let optionsPriority = []

    optionsPriority.push(
      {value: 1, label: '1'},
      {value: 2, label: '2'},
      {value: 3, label: '3'},
      {value: 4, label: '4'},
      {value: 5, label: '5'}
    )

    const priority =
        <Select
          styles={styles}
          classNamePrefix="react-select"
          className="taskFactory__select"
          defaultValue={0}
          id="priority"
          onChange={value => this.setState({taskPriority: value.value})}
          placeholder="Приоритет"
          options={optionsPriority}
        />

    let optionsExecutor = []
    /* eslint-disable */
      allUsers.map(user => {
        optionsExecutor.push({value: user.id,
          label: user.employee.forename +
          " " + user.employee.forename
          + ", " + user.employee.position.title})
      })
    /* eslint-enable */

    const executor =
        <Select
          styles={styles}
          classNamePrefix="react-select"
          className="taskFactory__select"
          name='executors'
          defaultValue='test'
          onChange={value => this.setState({executorId: value.value})}
          required={true}
          options={optionsExecutor}
          placeholder='Исполнитель'
        />

    let optionsFrequency = []
    /* eslint-disable */
    allFrequencies.map(frequency => {
      optionsFrequency.push({value: frequency, label: frequency})
    })
    /* eslint-enable */

    const frequency =
        <Select
          styles={styles}
          classNamePrefix="react-select"
          className="taskFactory__select"
          name='frequencies'
          defaultValue='0'
          onChange={value => this.setState({taskFrequency: value.value})}
          options={optionsFrequency}
          placeholder="Повторяемость"
        />

    const locationSelect =
      (<div className="taskFactory__wrap-select">
        {location}
        {!this.state.locationId &&
        <label className='taskFactory__errorText' htmlFor='locationsList'>{errorLocation}</label>}
      </div>)
    const roomSelect =
      (<div className="taskFactory__wrap-select">
        {rooms}
        {!this.state.idForRoom &&
        <label className='taskFactory__errorText' htmlFor='roomsList'>{errorRoom}</label>}
      </div>)
    const prioritySelect = (
      <div className="taskFactory__wrap-select">
        {priority}
      </div>
    )
    const executorSelect = (
      <div className="taskFactory__wrap-select">
        {executor}
        {!this.state.executorId &&
        <label className='taskFactory__errorText' htmlFor='executors'>{errorExecutor}</label>}
      </div>
    )
    const frequenciesSelect = (
      <div className="taskFactory__wrap-select">
        {frequency}
        {!this.state.taskFrequency &&
        <label className='taskFactory__errorText' htmlFor='frequencies'>{errorFrequency}</label>}
      </div>
    )

    if (!allUsers || !allLocations || !allStatuses || !allFrequencies) {
      return <Preloader/>
    }
    return (
      <div className="container createTask">
        {locationSelect}
        {floorSelected && roomSelect}
        {prioritySelect}
        <DatePicker
          className="date-picker"
          placeholderText='Выполнить до'
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
              escapeWithReference: false,
              boundariesElement: 'viewport'
            }
          }}
        />
        {executorSelect}
        {frequenciesSelect}
        <section className="taskFactory__wrap-textarea">
          <textarea
            className="taskFactory__textarea"
            name="task"
            cols="30"
            rows="10"
            ref={input => this.textForTask = input}
            onChange={this.changeErrorText}
            placeholder='Привет друг, что бы ты хотел мне написать?'
          >
          </textarea>
        </section>
        <section className="taskFactory__btns">
          <label className='taskFactory__errorText' htmlFor='task'>{errorText}</label>
          <div className="taskFactory__wrap-foto">
          Фото
            <input className="taskFactory__foto"
              type="file"
              accept="image/*"
              onChange={this.makePhoto}/>
          </div>
          <button
            className="taskFactory__create"
            onClick={this.createTask}>Добавить
          </button>
          {successAdd && <h3>{successAdd}</h3>}
        </section>
      </div>
    )
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

export default connect(mapStateToProps)(TaskFactory)
