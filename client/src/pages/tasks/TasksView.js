import React, { Component } from 'react'
import '../../styles/Tasks.css'
import { connect } from 'react-redux'
import Preloader from '../../components/Preloader'
import axios from 'axios/index'
import { deleteTask } from '../../actions/actions'
import Point from '../../components/Point'
import NotFound from '../../components/NotFoundData'
import Lightbox from 'react-images'
import dateFormat from 'dateformat'

class TasksView extends Component {
  constructor (props) {
    super(props)
    this.state = {
      lightbox: null
    }
    this.doTask = this.doTask.bind(this)
  }

  doTask (event) {
    let task = this.props.allTasks.find(task => task.id === +event.target.value)
    task.status = 'CLOSED'
    if (window.confirm('Вы выполнили задачу?')) {
      axios({
        method: 'put',
        url: `/task`,
        data: task
      })
        .then(response => this.props.deleteClosedTask(response.data))
    }
  }

  render () {
    const {
      showAll,
      showMyHotelTasks,
      showMyRoomTasks,
      allTasks,
      currentUser,
      tasksForRoom,
      itIsHistory,
      tasksForHistory
    } = this.props

    const color = '#c7c8ca'
    const {lightbox} = this.state

    let myRoomTasksFiltered = showMyRoomTasks && allTasks
      .filter(task => !isNaN(+task.locations
        .map(location => location.title)))
    let myHotelTasksFiltered = showMyHotelTasks && allTasks
      .filter(task => isNaN(+task.locations
        .map(location => location.title)))
      .filter(task => task.assignee.id === currentUser.employee.id)
    let tasks = (itIsHistory && tasksForHistory) || tasksForRoom || myRoomTasksFiltered || myHotelTasksFiltered || allTasks
    tasks.sort(function (a, b) {
      if (a.priority > b.priority) return -1
      if (a.priority < b.priority) return 1
      if (a.expired > b.expired) return 1
      if (a.expired < b.expired) return -1
      return 0
    })
    if (tasks && currentUser) {
      return (
        <ul className="tasks-list">
          {tasksForHistory && tasks.length === 0 && <NotFound/>}
          {tasks.map(task => {
            const isShowTask = currentUser.employee.id === task.assignee.id
            const hasPhoto = task.imageLinks.length > 0
            return (
              (showAll || isShowTask) &&
              <li className="tasks-list__elem"
                key={task.id}>
                <Point color={color}/>
                {hasPhoto && <div className="tasks-img"
                  onClick={() => this.setState({lightbox: task.imageLinks[0]})}>
                  <img src={task.imageLinks[0]} alt=""/>
                  <Lightbox
                    isOpen={lightbox === task.imageLinks[0]}
                    images={[{ src: task.imageLinks[0] }]}
                    onClose={() => this.setState({lightbox: null})}
                  />
                </div>}
                <h3 className="tasks-list__elem-title">{task.message}
                  {itIsHistory ||
                  (task.assignee.id === currentUser.employee.id && <button
                    className="task-complete"
                    value={task.id}
                    onClick={this.doTask.bind(this)}></button>)}
                </h3>
                {task.updated && <h4 className="tasks-list__elem-subtitle">{'Создана: ' +
                   dateFormat(task.updated, 'dd mmmm в HH:MM')}</h4>}

                <ul className="tasks-list__elem-info">
                  {!!task.priority && <li className="task--priority">
                    Важность: {task.priority}
                  </li>}
                  {task.locations.map(location => {
                    return (
                      <li className="task--location"
                        key={location.id}
                      >
                        {location.title}
                      </li>
                    )
                  })}
                  {itIsHistory
                    ? <li className="task--delegator">{task.assignee.forename} {task.assignee.surname}</li>
                    : <li className="task--delegator">{task.delegator.forename} {task.delegator.surname}</li>}
                </ul>
                {itIsHistory
                  ? <p className="tasks-list__elem-end">
                    {'Закрыта: ' + dateFormat(task.expired, 'dd mmmm в HH:MM')}</p>
                  : task.expired &&
                  <p className="tasks-list__elem-end">
                    {'Срок: ' + dateFormat(task.expired, 'dd mmmm в HH:MM')}
                  </p>}
              </li>
            )
          })}
        </ul>
      )
    } else {
      return (
        <Preloader/>
      )
    }
  }
}

const mapStateToProps = ({tasks, startData, selectedDate}) => {
  return {
    currentUser: startData.currentUser,
    dateForHistory: selectedDate.historySelectedDate,
    allTasks: tasks.allTasks
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    deleteClosedTask: data => dispatch(deleteTask(data)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TasksView)
