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
    if (this.props.tasksForCurrentRoom && this.props.currentLocation) {
      const {tasksForCurrentRoom, currentLocation} = this.props
      console.log(currentLocation)
      return (
        <div>
          <Link to={routes.createNewTask.href + currentLocation.title}><img src={picture} alt="add"/></Link>
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
    currentLocation: startData.locations
      .filter(location => location.children.length > 0)
      .find(location => location.children
        .find(children => children.title === ownProps.match.params.roomTitle))
      .children
      .find(children => children.title === ownProps.match.params.roomTitle)
  }
}

export default connect(mapStateToProps)(TasksForRoom)
