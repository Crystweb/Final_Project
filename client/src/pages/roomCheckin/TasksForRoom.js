import React, { Component } from 'react'
import TasksView from '../tasks/TasksView'
import { connect } from 'react-redux'
import routes from '../../constants/routes'
import picture from '../../img/add.png'
import { Link } from 'react-router-dom'
import Preloader from '../../components/Preloader'
import '../../styles/RoomCheckIn.css'
import api from '../../services/Api'

class TasksForRoom extends Component {
  constructor (props) {
    super(props)
    this.doCheckIn = this.doCheckIn.bind(this)
  }

  doCheckIn () {
    if (window.confirm('Утверждаете, что провели проверку номера?')) {
      const id = this.props.currentRoom.id
      api.post(`/check-in/${id}`)
        .then(() => this.props.history.push('/rooms'))
    }
  }

  render () {
    const {tasksForCurrentRoom, currentRoom, currentFloor} = this.props
    if (tasksForCurrentRoom && currentRoom && currentFloor) {
      routes.createTaskForRoom.previousHref = '/rooms/' + currentRoom.id
      return (
        <div className="tasks">
          <div className='roomActions'>
            <span className='roomActions__success' onClick={this.doCheckIn}>
              Проверен
            </span>
            <Link to={routes.createNewTask.href + currentFloor.id + '/' + currentRoom.id}><img src={picture} alt="add"/></Link>
          </div>
          <TasksView
            tasksForRoom={tasksForCurrentRoom}
            showAll={true}
          />
        </div>
      )
    } else {
      return (
        <Preloader/>
      )
    }
  }
}

const mapStateToProps = ({tasks, startData}, ownProps) => {
  return {
    tasksForCurrentRoom: tasks.allTasks.filter(task => task.locations.find(location => location.id === +ownProps.match.params.roomId)),
    currentRoom: startData.locations
      .find(location => location.children
        .find(children => children.id === +ownProps.match.params.roomId))
      .children
      .find(children => children.id === +ownProps.match.params.roomId),
    currentFloor: startData.locations
      .find(location => location.children
        .find(children => children.id === +ownProps.match.params.roomId))
  }
}

export default connect(mapStateToProps)(TasksForRoom)
