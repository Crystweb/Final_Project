import React, { Component } from 'react'
import routes from '../../constants/routes'
import { Link } from 'react-router-dom'
import '../../styles/Home.css'
import { connect } from 'react-redux'
import picture from '../../img/addComment.png'
import calendar from '../../img/calendar.png'
import '../../styles/Tasks.css'
import Preloader from '../../components/Preloader'
import MyTasks from './MyTasks'

class Tasks extends Component {
  constructor (props) {
    super(props)
    this.state = {
      showAll: false
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
    if (this.props.tasks && this.props.user) {
      const showButtonsForAdmin = this.props.user.position.title === 'Администратор'
      const showButtonsForManager = this.props.user.position.title === 'Менеджер'
      const showButtonsForDirector = this.props.user.position.title === 'Управляющий'
      const showButtonsForOwner = this.props.user.position.title === 'Собственник'
      return (
        <div className="container tasks__nav">
          <MyTasks showAll={this.state.showAll}/>
          {(showButtonsForAdmin ||
            showButtonsForManager ||
            showButtonsForDirector ||
            showButtonsForOwner) &&
          <Link to={routes.tasks.createNewTask.href}><img src={picture} alt="add"/></Link>
          }
          {(showButtonsForAdmin ||
            showButtonsForManager ||
            showButtonsForDirector ||
            showButtonsForOwner) &&
          <Link to={routes.tasks.tasksHistory.href}><img src={calendar} alt="calendar"/></Link>
          }
          {(showButtonsForAdmin ||
            showButtonsForManager ||
            showButtonsForDirector ||
            showButtonsForOwner) &&
          <form>
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
          </form>
          }
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
