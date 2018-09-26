import React, { Component, Fragment } from 'react'
import '../../styles/Tasks.css'
import { connect } from 'react-redux'
import Preloader from '../../components/Preloader'

class TasksView extends Component {
  render () {
    const {showAll, tasks, currentUser} = this.props
    tasks.sort(function (a, b) {
      if (a.priority > b.priority) return 1
      if (a.priority < b.priority) return -1
      return 0
    })
    if (tasks && currentUser) {
      return (
        <Fragment>
          {tasks.map(task => {
            const isShowTask = currentUser.id === task.assignee.id
            return (
              <Fragment key={task.id}>
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
                    <p>Важность: {task.priority}</p>
                    <p>Создана: {new Date(task.updated).toLocaleDateString()}</p>
                    <p>{task.delegator.employee.forename} {task.delegator.employee.surname}</p>
                    <p>Выполнить до: {new Date(task.expired).toLocaleDateString()}</p>
                    <p>{task.status}</p>
                  </li>
                  <button>Изменить статус</button>
                  <button>Фото</button>
                </div>}
              </Fragment>
            )
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
    tasks: tasks.allTasks,
    currentUser: startData.currentUser
  }
}

export default connect(mapStateToProps)(TasksView)
