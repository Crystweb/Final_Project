import React, { Component } from 'react'
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
      showMyHotelTasks: true,
      showMyRoomTasks: false
    }
    this.showAllActualTasks = this.showAllActualTasks.bind(this)
    this.showMyActualHotelTasks = this.showMyActualHotelTasks.bind(this)
    this.showMyActualRoomTasks = this.showMyActualRoomTasks.bind(this)
  }

  showAllActualTasks = () => {
    return (
      this.setState({
        showAll: true,
        showMyHotelTasks: false,
        showMyRoomTasks: false
      })
    )
  }

  showMyActualHotelTasks = () => {
    return (
      this.setState({
        showMyHotelTasks: true,
        showAll: false,
        showMyRoomTasks: false
      })
    )
  }

  showMyActualRoomTasks = () => {
    return (
      this.setState({
        showMyHotelTasks: false,
        showAll: false,
        showMyRoomTasks: true
      })
    )
  }

  render () {
    const {user, tasks} = this.props
    if (tasks && user) {
      const showEditButtons = user.employee.position.pinnedToComment === true
      return (
          <div className="tasks">
            <TasksView
              showAll={this.state.showAll}
              showMyHotelTasks={this.state.showMyHotelTasks}
              showMyRoomTasks={this.state.showMyRoomTasks}
            />
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
                  <ul>
                    {showEditButtons && <li>
                      <input
                        name='tasks'
                        type='radio'
                        value='allTasks'
                        defaultChecked={false}
                        onClick={this.showAllActualTasks}/>
                      Все задачи
                    </li>}
                    <li>
                      <input
                        name='tasks'
                        type='radio'
                        value='myHotelTasks'
                        onClick={this.showMyActualHotelTasks}
                        defaultChecked={true}/>
                      Мои задачи Отель
                    </li>
                    <li>
                      <input
                        name='tasks'
                        type='radio'
                        value='myRoomsTasks'
                        onClick={this.showMyActualRoomTasks}
                        defaultChecked={false}/>
                      Мои задачи Номера
                    </li>
                  </ul>

                </div>
              </div>
            </div>
          </div>
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
