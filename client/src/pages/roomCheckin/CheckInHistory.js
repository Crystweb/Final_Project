import React, { Component } from 'react'
import Calendar from '../../components/Сalendar'
import connect from 'react-redux/es/connect/connect'
import axios from 'axios'
import { addChecKHistory } from '../../actions/actions'
import Preloader from '../../components/Preloader'

class CheckInHistory extends Component {
  render () {
    const addHistory = () => {
      if (this.props.date) {
        // axios.get('/check-in', {
        //   params: {
        //     date: new Date(this.props.date)
        //   }
        // })
        axios.get(`/check-in?date=${this.props.date}`)
          .then(response => this.props.roomCheckHistory(response.data))
      }
    }
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
    addHistory()
    return (
      <div>
      
      </div>
    )
  }
}

const mapStateToProps = ({selectedDate, checkIn}) => {
  return {
    date: selectedDate.historySelectedDate,
    historyForSelectedDate: checkIn.roomCheckHistory
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    roomCheckHistory: (data) => {
      dispatch(addChecKHistory(data))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CheckInHistory)
