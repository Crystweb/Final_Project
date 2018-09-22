import React, { Component } from 'react'
import routes from '../constants/routes'
import { Link } from 'react-router-dom'
import '../styles/Home.css'
import { connect } from 'react-redux'
import axios from 'axios'
import { addTasks } from '../actions/actions'
import picture from '../img/addComment.png'
import '../styles/Tasks.css'

class Tasks extends Component {

  componentDidMount () {
    axios.get('/task')
      .then(response => this.props.addTasks(response.data))

  }

  render () {
    return (
      <div className="container tasks__nav">
          <Link to={routes.tasks.myTasks.href}>{routes.tasks.myTasks.name}</Link>
          <Link to={routes.tasks.createNewTask.href}><img src={picture} alt="add"/></Link>
      </div>
    )
  }
}

const mapStateToProps = ({tasks}) => {
  return {
    tasks: tasks.allTasks
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    addTasks: (data) => {
      dispatch(addTasks(data))
    }
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Tasks)
