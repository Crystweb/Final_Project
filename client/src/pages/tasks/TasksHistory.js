import React, { Component } from 'react'
import Calendar from '../../components/Сalendar'
import axios from 'axios/index'
import { addHitoryTasks, addSelectedDateFromCalendar } from '../../actions/actions'
import connect from 'react-redux/es/connect/connect'
import TasksView from './TasksView'

class TasksHistory extends Component {
  getTasksForSelectedDate (date) {
    axios.get(`/task/date?from=${date}&to=${date + 86400000}`)
      .then(response => this.props.addTasksHistory(response.data))
      .then(() => this.props.addDate(date))
  }

  render () {
    if (!this.props.date) {
      let today = new Date()
      let sixMonthAgo = new Date(today.getFullYear(), today.getMonth(), today.getDate() - 180)
      return (
        <div className='container calendar'>
          <Calendar
            max={today}
            min={sixMonthAgo}
            selected={today}
            minDate={sixMonthAgo}
            maxDate={today}
            getData={this.getTasksForSelectedDate.bind(this)}
          />
        </div>
      )
    }
    return (
      <TasksView tasksForHistory={this.props.tasksForHistory} itIsHistory={true}/>
    )
  }
}

const mapStateToProps = ({selectedDate}) => {
  return {
    date: selectedDate.historySelectedDate,
    tasksForHistory: selectedDate.tasksForSelectedDates
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    addTasksHistory: data => dispatch(addHitoryTasks(data)),
    addDate: date => dispatch(addSelectedDateFromCalendar(date))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TasksHistory)
