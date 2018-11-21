import React, { Component } from 'react'
import SortedComments from '../../components/SortedComments'
import Preloader from '../../components/Preloader'

class ShiftHistoryForSelectedDay extends Component {

  render () {
    const {commentsForSelectedDate, date} = this.props
    if (commentsForSelectedDate && date) {
      return (
        <div className="container">
          <h4 className="shiftHistory-dateTitle">{new Date(date).toLocaleDateString()}</h4>
          <SortedComments create={false} comments={commentsForSelectedDate}/>
        </div>
      )
    } else {
      return (
        <Preloader/>
      )
    }
  }
}

export default ShiftHistoryForSelectedDay
