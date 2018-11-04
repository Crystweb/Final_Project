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
import Select from 'react-select'

class TaskFactory extends Component {
  constructor (props) {
    super(props)
    this.locationId = React.createRef()
    this.textForTask = React.createRef()
    // this.idForRoom = React.createRef()
    // this.executorId = React.createRef()
    // this.taskPriority = React.createRef()
    // this.taskFrequency = React.createRef()

    this.state = {
      finishDate: null,
      errorExecutor: null,
      errorText: null,
      errorLocation: null,
      errorFrequency: null,
      errorRoom: null,
      successAdd: null,
      photo: null,
      floorSelected: !!this.props.match.params.floorId,

      // locationId: null,
      idForRoom: null,
      executorId: null,
      taskPriority: 0,
      taskFrequency: null
    }
    _.bindAll(this, 'chooseDate', 'makePhoto', 'createTask', 'floorChecker')
  }

  componentDidMount () {
    const {floorId, roomId} = this.props.match.params
    if (floorId || !isNaN(this.locationId)) {
      this.locationId = +floorId
      this.setState({
        floorSelected: true,
        idForRoom: +roomId})
    }
  }

  chooseDate (day) {
    this.setState({
      finishDate: day
    })
  }

  floorChecker = () => {
    let {allLocations} = this.props
    this.setState({
      floorSelected: allLocations.filter(location => location.children.length > 0)
        .some(location => location.id === this.locationId)
    })
  }

  makePhoto = (event) => {
    this.setState({photo: event.target.files[0]})
  }

  createTask = () => {
    const {textForTask, locationId} = this
    const {finishDate, photo, idForRoom, executorId, taskPriority, taskFrequency} = this.state
    const {allLocations, allUsers} = this.props

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

    if (textForTask.value && taskFrequency && executorId && locationId) {
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

    allLocations.map(location => {
      optionsLocation.push({value: location.id, label: location.title})
    })

    const location = (
      <Select
        styles={styles}
        classNamePrefix="react-select"
        className="taskFactory__select"
        defaultValue="locationChoice"
        value={optionsLocation.find(location => location.value === this.locationId)}
        placeholder="Локация"
        onChange={value => {
          this.locationId = value.value
          this.floorChecker()
        }}
        options={optionsLocation}
      />
    )

    let optionsRoom = []

    allLocations.some(location => location.id === (this.locationId || floorId)) &&
    allLocations.find(location => location.id === (this.locationId || floorId)).children.map(children => {
        optionsRoom.push({value: children.id, label: children.title})
    })

    const rooms = (
      <Select
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
      {value: 1, label: "1"},
      {value: 2, label: "2"},
      {value: 3, label: "3"},
      {value: 4, label: "4"},
      {value: 5, label: "5"}
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

      allUsers.map(user => {
      optionsExecutor.push({value: user.id,
        label: user.employee.forename +
        " " + user.employee.forename
        + ", " + user.employee.title})
    })

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

    allFrequencies.map(frequency => {
      optionsFrequency.push({value: frequency, label: frequency})
    })

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
        {!this.locationId &&
        <label className='taskFactory__errorText' htmlFor='locationsList'>{errorLocation}</label>}
      </div>)
    const roomSelect =
      (<div className="taskFactory__wrap-select">
        {rooms}
        {!this.state.idForRoom  &&
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
        <p className="taskFactory__wrap-textarea">
        <textarea
          className="taskFactory__textarea"
          name="task"
          cols="30"
          rows="10"
          ref={input => this.textForTask = input}
          placeholder='Привет друг, что бы ты хотел мне написать?'
        >
        </textarea>
        </p>
        <p className="taskFactory__btns">
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
      </p>
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

const mapDispatchToProps = (dispatch) => {
  return {
    addTask: (data) => {
      dispatch(addNewTask(data))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TaskFactory)
