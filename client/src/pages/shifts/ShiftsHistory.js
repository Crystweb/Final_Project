import React, { Component } from 'react'
import Calendar from '../../components/Сalendar'

class ShiftsHistory extends Component {

  render () {
    var today = new Date()
    var sixMonthAgo = new Date(today.getFullYear(), today.getMonth(), today.getDate() - 180)
    return (
      <div className='container calendar'>
        <Calendar max={today} min={sixMonthAgo} selected={today} minDate={sixMonthAgo} maxDate={today}/>
      </div>
    )
  }
}

export default ShiftsHistory
