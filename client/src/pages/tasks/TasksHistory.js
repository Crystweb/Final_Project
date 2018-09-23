import React, { Component } from 'react'
import Calendar from '../../components/Сalendar'

class TasksHistory extends Component {

  render () {
    let today = new Date()
    let sixMonthAgo = new Date(today.getFullYear(), today.getMonth(), today.getDate() - 180)
    return (
      <div className='container calendar'>
        <Calendar max={today} min={sixMonthAgo} selected={today} minDate={sixMonthAgo} maxDate={today} isForCommeents={false}/>
      </div>
    )
  }
}

export default TasksHistory
