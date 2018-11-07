import React, { Component } from 'react'
import Calendar from '../../components/Сalendar'
import CheckInHistoryForSelectedDate from './CheckInHistoryForSelectedDate'
import connect from 'react-redux/es/connect/connect'
import axios from 'axios'
import { addChecKHistory, addSelectedDateFromCalendar } from '../../actions/actions'

class CheckInHistory extends Component {
  getCheckInForSelectedDate (date) {
    axios.get('/check-in', {
      params: {
        date: date
      }
    })
      .then(response => this.props.roomCheckHistory(response.data))
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
            getData={this.getCheckInForSelectedDate.bind(this)}
          />
        </div>
      )
    }
    return (
      <CheckInHistoryForSelectedDate history={this.props.сheckInForSelectedDate}/>
    )
  }
}

const mapStateToProps = ({selectedDate, checkIn}) => {
  return {
    date: selectedDate.historySelectedDate,
    сheckInForSelectedDate: checkIn.roomCheckHistory
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    roomCheckHistory: data => dispatch(addChecKHistory(data)),
    addDate: date => dispatch(addSelectedDateFromCalendar(date))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CheckInHistory)
