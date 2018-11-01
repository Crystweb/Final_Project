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
    this.idForRoom = React.createRef()
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
      floorSelected: !!this.props.match.params.floorId
    }
    _.bindAll(this, 'chooseDate', 'makePhoto', 'createTask', 'floorChecker')
  }

  componentDidMount () {
    const {floorId, roomId} = this.props.match.params
    if (floorId || !isNaN(this.locationId.value)) {
      this.locationId.value = floorId
      this.setState({floorSelected: true})
      this.idForRoom.value = roomId
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
        .some(location => location.id === +this.locationId.value)
    })
  }

  makePhoto = (event) => {
    this.setState({photo: event.target.files[0]})
  }

  createTask = () => {
    const {locationId, textForTask, idForRoom, executorId, taskPriority, taskFrequency} = this
    const {finishDate, photo} = this.state
    const {allLocations, allUsers} = this.props
    if (isNaN(locationId.value)) {
      this.setState({
        errorLocation: 'Выберите локацию'
      })
    }
    if (idForRoom && isNaN(idForRoom.value)) {
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
      let locations = ((idForRoom && +idForRoom.value) && allLocations.find(location => location.id === +locationId.value).children) ||
        allLocations
      let locationType = (idForRoom && +idForRoom.value) || (locationId && +locationId.value)
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
        display: "none"
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
        placeholder="Локация"
        onChange={this.floorChecker}
        ref={(input) => this.locationId = input}
        disabled={!!floorId}
        options={optionsLocation}
      />
    )

    let optionsRoom = []

    allLocations.some(location => location.id === (+this.locationId.value || +floorId)) &&
    allLocations.find(location => location.id === (+this.locationId.value || +floorId)).children.map(children => {
        optionsRoom.push({value: children.id, label: children.title})
    })

    const rooms = (
      <Select
        styles={styles}
        classNamePrefix="react-select"
        className="taskFactory__select"
        defaultValue="roomChoice"
        ref={(input) => this.idForRoom = input}
        name="roomsList"
        disabled={!!roomId}
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

      const priority = <Select
        styles={styles}
        classNamePrefix="react-select"
                                className="taskFactory__select"
                               defaultValue='0'
                               id="priority"
                               ref={input => this.taskPriority = input}
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

      const executor = <Select
        styles={styles}
        classNamePrefix="react-select"
                              className="taskFactory__select"
                               name='executors'
                               defaultValue='test'
                               ref={input => this.executorId = input}
                               required={true}
                               options={optionsExecutor}
                              placeholder='Исполнитель'

                      />

        let optionsFrequency = []

    allFrequencies.map(frequency => {
      optionsFrequency.push({value: frequency, label: frequency})
    })

      const frequency = <Select
        styles={styles}
        classNamePrefix="react-select"
                                className="taskFactory__select"
                                name='frequencies'
                                defaultValue='0'
                                ref={(input) => this.taskFrequency = input}
                                options={optionsFrequency}
                                placeholder="Повторяемость"

          />







    const locationSelect =
      (<div className="taskFactory__wrap-select">
        {location}
        {/*<select*/}
          {/*name='locationsList'*/}
          {/*defaultValue='locationChoice'*/}
          {/*ref={(input) => this.locationId = input}*/}
          {/*onChange={this.floorChecker}*/}
          {/*disabled={!!floorId}>*/}
          {/*<option value="locationChoice" disabled hidden>*/}
            {/*Локация*/}
          {/*</option>*/}
          {/*{allLocations.map(location => {*/}
            {/*return (*/}
              {/*<option value={location.id} key={location.id}>*/}
                {/*{location.title}*/}
              {/*</option>*/}
            {/*)*/}
          {/*})}*/}
        {/*</select>*/}
        {isNaN(this.locationId.value) &&
        <label className='taskFactory__errorText' htmlFor='locationsList'>{errorLocation}</label>}
      </div>)
    const roomSelect =
      (<div className="taskFactory__wrap-select">
        {rooms}
        {/*<select*/}
          {/*name="roomsList"*/}
          {/*defaultValue='roomChoice'*/}
          {/*ref={(input) => this.idForRoom = input}*/}
          {/*disabled={!!roomId}*/}
        {/*>*/}
          {/*<option value='roomChoice' disabled hidden>*/}
            {/*Номер*/}
          {/*</option>*/}
          {/*{*/}
            {/*allLocations.some(location => location.id === (+this.locationId.value || +floorId)) &&*/}
            {/*allLocations.find(location => location.id === (+this.locationId.value || +floorId)).children.map(children => {*/}
              {/*return (*/}
                {/*<option value={children.id} key={children.id}>*/}
                  {/*{children.title}*/}
                {/*</option>*/}
              {/*)*/}
            {/*})}*/}
        {/*</select>*/}
        {(this.idForRoom && isNaN(this.idForRoom.value)) &&
        <label className='taskFactory__errorText' htmlFor='roomsList'>{errorRoom}</label>}
      </div>)
    const prioritySelect = (
      <div className="taskFactory__wrap-select">
        {priority}
        {/*<select defaultValue='0' id="priority" ref={input => this.taskPriority = input}>*/}
          {/*<option value="0" disabled hidden>*/}
          {/*приоритет*/}
          {/*</option>*/}
          {/*<option value="1">1</option>*/}
          {/*<option value="2">2</option>*/}
          {/*<option value="3">3</option>*/}
          {/*<option value="4">4</option>*/}
          {/*<option value="5">5</option>*/}
        {/*</select>*/}
      </div>
    )
    const executorSelect = (
      <div className="taskFactory__wrap-select">
        {executor}
        {/*<select*/}
          {/*name='executors'*/}
          {/*defaultValue='test'*/}
          {/*required={true}*/}
          {/*ref={input => this.executorId = input}>*/}
          {/*<option disabled hidden value='test'>*/}
            {/*Исполнитель*/}
          {/*</option>*/}
          {/*{allUsers.map(user => {*/}
            {/*return (*/}
              {/*<option value={user.id} key={user.id}>*/}
                {/*{user.employee.forename} {user.employee.forename}, {user.employee.position.title}*/}
              {/*</option>*/}
            {/*)*/}
          {/*})}*/}
        {/*</select>*/}
        {isNaN(this.executorId.value) &&
        <label className='taskFactory__errorText' htmlFor='executors'>{errorExecutor}</label>}
      </div>
    )
    const frequenciesSelect = (
      <div className="taskFactory__wrap-select">
        {frequency}
        {/*<select name='frequencies' defaultValue='0' ref={(input) => this.taskFrequency = input}>*/}
          {/*<option value='0' hidden disabled>*/}
            {/*Повторяемость*/}
          {/*</option>*/}
          {/*{allFrequencies.map(frequency => {*/}
            {/*return (*/}
              {/*<option value={frequency} key={frequency}>*/}
                {/*{frequency}*/}
              {/*</option>*/}
            {/*)*/}
          {/*})}*/}
        {/*</select>*/}
        {!isNaN(this.taskFrequency.value) &&
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
        {this.textForTask.value ||
        <label className='taskFactory__errorText' htmlFor='task'>{errorText}</label>}
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
