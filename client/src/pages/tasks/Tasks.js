import React, { Component, Fragment } from 'react'
import routes from '../../constants/routes'
import { Link } from 'react-router-dom'
import '../../styles/Home.css'
import { connect } from 'react-redux'
import picture from '../../img/addComment.png'
import calendar from '../../img/calendar.png'
import '../../styles/Tasks.css'
import Preloader from '../../components/Preloader'
import TasksView from './TasksView'

class Tasks extends Component {
  constructor (props) {
    super(props)
    this.state = {
      showAll: false,
    }
  }

  showAllActualTasks = () => {
    return (
      this.setState({showAll: true})
    )
  }

  showMyActualTasks = () => {
    return (
      this.setState({showAll: false})
    )
  }

  render () {
    const {user} = this.props
    if (this.props.tasks && this.props.user) {
      const showEditButtons = user.position.pinnedToComment === true
      return (
        <Fragment>
          <div className="tasks">
            <TasksView showAll={this.state.showAll}/>
            <div className='tasks__items'>
              <div className='control'>
                <div className='control__buttons'>
                  {showEditButtons &&
                  <Link to={routes.createNewTask.href}><img src={picture} alt="add"/></Link>
                  }
                  {showEditButtons &&
                  <Link to={routes.tasksHistory.href}><img src={calendar} alt="calendar"/></Link>
                  }
                </div>
                <div className='control__radio'>
                  {showEditButtons &&
                  <ul>
                    <li>
                      <input
                        name='tasks'
                        type='radio'
                        value='allTasks'
                        defaultChecked={false}
                        onClick={this.showAllActualTasks}/>
                      Все задачи
                    </li>
                    <li>
                      <input
                        name='tasks'
                        type='radio'
                        value='myTasks'
                        onClick={this.showMyActualTasks}
                        defaultChecked={true}/>
                      Мои задачи
                    </li>
                  </ul>
                  }
                </div>
              </div>
            </div>
          </div>
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
    user: startData.currentUser
  }
}

export default connect(mapStateToProps)(Tasks)
