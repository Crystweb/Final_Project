import React, { Component } from 'react'
import Calendar from '../../components/Сalendar'
import axios from 'axios/index'
import { addCommentForSelectedDate, addSelectedDateFromCalendar } from '../../actions/actions'
import connect from 'react-redux/es/connect/connect'
import ShiftHistoryForSelectedDay from './ShiftsHistoryForSelectedDay'

class ShiftsHistory extends Component {
  getCommentsInForSelectedDate (date) {
    axios.get('/workshift', {
      params: {
        date: date
      }
    })
      .then(response => this.props.addCommentsForSelectedDate(response.data))
      .then(() => this.props.addDate(date))
  }
  render () {
    if (!this.props.date) {
      let today = new Date()
      let sixMonthAgo = new Date(today.getFullYear(), today.getMonth(), today.getDate() - 180)
      return (
        <div className='container calendar'>
          <Calendar max={today}
            min={sixMonthAgo}
            selected={today}
            minDate={sixMonthAgo}
            maxDate={today}
            getData={this.getCommentsInForSelectedDate.bind(this)}
          />
        </div>
      )
    }
    return (
      <ShiftHistoryForSelectedDay
        commentsForSelectedDate={this.props.commentsForSelectedDate}
        date={this.props.date}
      />
    )
  }
}

const mapStateToProps = ({selectedDate}) => {
  return {
    date: selectedDate.historySelectedDate,
    commentsForSelectedDate: selectedDate.commentsForSelectedDates
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    addCommentsForSelectedDate: data => dispatch(addCommentForSelectedDate(data)),
    addDate: date => dispatch(addSelectedDateFromCalendar(date))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ShiftsHistory)
