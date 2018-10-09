import React, { Component, Fragment } from 'react'
import '../../styles/Tasks.css'
import { connect } from 'react-redux'
import Preloader from '../../components/Preloader'
import axios from 'axios/index'
import { deleteTask } from '../../actions/actions'

class TasksView extends Component {
  constructor (props) {
    super(props)
    this.state = {
      isOpenPhoto: false
    }
    this.showPhoto = this.showPhoto.bind(this)
    this.doTask = this.doTask.bind(this)
  }

  showPhoto () {
    this.setState({isOpenPhoto: true})
  }

  doTask (event) {
    let task = this.props.allTasks.find(task => task.id === +event.target.value)
    let body = {
      id: task.id,
      status: 'CLOSED',
      updated: new Date()
    }
    let formData = new FormData()
    formData.append('task', JSON.stringify(body))
    if (window.confirm('Вы выполнили задачу?')) {
      axios({
        method: 'put',
        url: `/task`,
        data: formData
      })
        .then(response => this.props.deleteClosedTask(response.data))
    }
  }

  render () {
    const {showAll, showMyHotelTasks, showMyRoomTasks, allTasks, currentUser, tasksForRoom} = this.props
    let myRoomTasksFiltered = showMyRoomTasks && allTasks.filter(task => !isNaN(+task.locations.map(location => location.title)))
    let myHotelTasksFiltered = showMyHotelTasks && allTasks.filter(task => isNaN(+task.locations.map(location => location.title))).filter(task => task.assignee.userId === currentUser.id)
    let tasks = tasksForRoom || myRoomTasksFiltered || myHotelTasksFiltered || allTasks
    tasks.sort(function (a, b) {
      if (a.priority > b.priority) return 1
      if (a.priority < b.priority) return -1
      if (a.expired > b.expired) return 1
      if (a.expired < b.expired) return -1
      return 0
    })
    if (tasks && currentUser) {
      return (
        <Fragment>
          {tasks.map(task => {
            const photoLink = task.imageLinks[0]
            const isShowTask = currentUser.id === task.assignee.userId
            const hasPhoto = task.imageLinks.length > 0
            return <Fragment key={task.id}>
              {(showAll || isShowTask) &&
              <div className='myTask'>
                <li className='myTask__item' key={task.id}>
                  <h3>{task.message}</h3>
                  <div>{task.locations.map(location => {
                    return (
                      <h5 key={location.id}>{location.title}</h5>
                    )
                  })}
                  </div>
                  {task.priority && <p>Важность: {task.priority}</p>}
                  <p>Создана: {new Date(task.updated).toLocaleDateString()}</p>
                  <p>{task.delegator.forename} {task.delegator.surname}</p>
                  {task.expired && <p>Выполнить до: {new Date(task.expired).toLocaleDateString()}</p>}
                </li>
                {task.assignee.userId === currentUser.id && <button
                  value={task.id}
                  onClick={this.doTask.bind(this)}>Выполнить
                </button>}
                {hasPhoto && <button onClick={this.showPhoto}>Фото</button>}
              </div>}
            </Fragment>
          })}
        </Fragment>
      )
    } else {
      return (
        <Preloader/>
      )
    }
  }
}

const mapStateToProps = ({tasks, startData}) => {
  return {
    allTasks: tasks.allTasks,
    currentUser: startData.currentUser
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    deleteClosedTask: (data) => {
      dispatch(deleteTask(data))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TasksView)
