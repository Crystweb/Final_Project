import React, { Component } from 'react'
import Calendar from '../../components/Сalendar'

class ShiftsHistory extends Component {

  render () {
    let today = new Date()
    let sixMonthAgo = new Date(today.getFullYear(), today.getMonth(), today.getDate() - 180)
    return (
      <div className='container calendar'>
        <Calendar max={today} min={sixMonthAgo} selected={today} minDate={sixMonthAgo} maxDate={today} isForComments={true}/>
      </div>
    )
  }
}

export default ShiftsHistory
