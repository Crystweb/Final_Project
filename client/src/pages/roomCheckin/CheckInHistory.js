import React, { Component } from 'react'
import Calendar from '../../components/Сalendar'
import connect from 'react-redux/es/connect/connect'

class CheckInHistory extends Component {

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
            isForCheckIn={true}
          />
        </div>
      )
    }
    return (
      <h3>good</h3>
    )
  }
}

const mapStateToProps = ({selectedDate}) => {
  return {
    date: selectedDate.historySelectedDate
  }
}

export default connect(mapStateToProps)(CheckInHistory)
