import React, { Component } from 'react'
import routes from '../../constants/routes'
import { Link } from 'react-router-dom'
import '../../styles/Home.css'
import { connect } from 'react-redux'
import picture from '../../img/add.png'
import calendar from '../../img/calendar.png'
import '../../styles/Tasks.css'
import Preloader from '../../components/Preloader'
import TasksView from './TasksView'
import { deleteDate } from '../../actions/actions'

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

  componentDidMount () {
    this.props.date && this.props.deleteSelectedDate()
  }

  render () {
    const {user, tasks} = this.props
    if (tasks && user) {
      const showEditButtons = user.employee.position.pinnedToComment === true

      return (
        <div className="tasks">
          <div className="radioANDbuttons tasks-radions">
            {showEditButtons &&
            <ul className="position-radio-buttons">
              <li className="position-radio-buttons__elem">
                <label>
                  <input
                    name='tasks'
                    type='radio'
                    value='allTasks'
                    defaultChecked={false}
                    onClick={this.showAllActualTasks}/>
                  <div className="position-radio-buttons__fakeBtn">
                    <div className="position-radio-buttons__fakeBtn-active"></div>
                  </div>
                  <span>Все задачи</span>
                </label>
              </li>
              <li className="position-radio-buttons__elem">
                <label>
                  <input
                    name='tasks'
                    type='radio'
                    value='myHotelTasks'
                    onClick={this.showMyActualHotelTasks}
                    defaultChecked={true}/>
                  <div className="position-radio-buttons__fakeBtn">
                    <div className="position-radio-buttons__fakeBtn-active"></div>
                  </div>
                  <span>Мои задачи Отель</span>
                </label>
              </li>
              <li className="position-radio-buttons__elem">
                <label>
                  <input
                    name='tasks'
                    type='radio'
                    value='myRoomsTasks'
                    onClick={this.showMyActualRoomTasks}
                    defaultChecked={false}/>
                  <div className="position-radio-buttons__fakeBtn">
                    <div className="position-radio-buttons__fakeBtn-active"></div>
                  </div>
                  <span>Мои задачи Номера</span>
                </label>
              </li>
            </ul>
            }
            {showEditButtons && <div className='add_and_history'>
              <Link to={routes.createNewTask.href}><img src={picture} alt="add"/></Link>
              <Link to={routes.tasksHistory.href}><img src={calendar} alt="calendar"/></Link>
            </div>
              }
          </div>
            <TasksView
              showAll={this.state.showAll}
              showMyHotelTasks={this.state.showMyHotelTasks}
              showMyRoomTasks={this.state.showMyRoomTasks}
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

const mapStateToProps = ({tasks, startData, selectedDate}) => {
  return {
    tasks: tasks.allTasks,
    user: startData.currentUser,
    date: selectedDate.historySelectedDate
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    deleteSelectedDate: () => {
      dispatch(deleteDate())
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Tasks)
