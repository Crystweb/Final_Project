import React, { Component } from 'react'
import TasksView from '../tasks/TasksView'
import { connect } from 'react-redux'
import routes from '../../constants/routes'
import picture from '../../img/addComment.png'
import { Link } from 'react-router-dom'
import Preloader from '../../components/Preloader'

class TasksForRoom extends Component {
  constructor (props) {
    super(props)
    this.state = {}
  }

  render () {
    const {tasksForCurrentRoom, currentRoom, currentFloor} = this.props

    if (tasksForCurrentRoom && currentRoom && currentFloor) {
      routes.createTaskForRoom.previousHref = '/rooms/' + currentRoom.id
      return (
        <div>
          <Link to={routes.createNewTask.href + currentFloor.id + '/' + currentRoom.id}><img src={picture} alt="add"/></Link>
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
    tasksForCurrentRoom: tasks.allTasks.filter(task => task.locations[0].title === ownProps.match.params.roomTitle),
    currentRoom: startData.locations
      .find(location => location.children
        .find(children => children.title === ownProps.match.params.roomTitle))
      .children
      .find(children => children.title === ownProps.match.params.roomTitle),
    currentFloor: startData.locations
      .find(location => location.children
        .find(children => children.title === ownProps.match.params.roomTitle))
  }
}

export default connect(mapStateToProps)(TasksForRoom)
