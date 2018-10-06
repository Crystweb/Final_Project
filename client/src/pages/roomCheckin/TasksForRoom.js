import React, { Component } from 'react'
import TasksView from '../tasks/TasksView'
import { connect } from 'react-redux'

class TasksForRoom extends Component {
  constructor (props) {
    super(props)
    this.state = {}
  }

  render () {
    if (this.props.tasksForCurrentRoom) {
      return (
        <TasksView tasksForRoom={this.props.tasksForCurrentRoom}/>
      )
    }
  }
}

const mapStateToProps = ({tasks}, ownProps) => {
  debugger
  return {
    tasksForCurrentRoom: tasks.allTasks.filter((task) => task.locations[0].title === ownProps.match.params.roomTitle)
  }
}

export default connect(mapStateToProps)(TasksForRoom)
