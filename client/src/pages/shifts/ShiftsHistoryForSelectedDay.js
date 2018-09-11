import React, { Component } from 'react'
import { connect } from 'react-redux'
import axios from 'axios'
import { addCommentForSelectedDate } from '../../actions/actions'
import SortedComments from '../../components/SortedComments'
import Preloader from '../../components/Preloader'

class ShiftHistoryForSelectedDay extends Component {

  componentDidMount () {
    axios.get(`/workshift?date=${this.props.date}`)
      .then(response => this.props.addCommentsForSelectedDate(response.data))
  }

  render () {
    if (this.props.commentsForSelectedDate) {
      return (
        <div className="container">
          <h4>{new Date(this.props.date).toLocaleDateString()}</h4>
          <nav className='navigation'>
            <SortedComments comments={this.props.commentsForSelectedDate}/>
          </nav>
        </div>
      )
    } else {
      return (
        <Preloader/>
      )
    }
  }
}

const mapStateToProps = (state) => {
  return {
    date: state.shiftHistorySelectedDate.selectedDate,
    commentsForSelectedDate: state.shiftHistorySelectedDate.commentsForSelectedDates
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    addCommentsForSelectedDate: (data) => {
      dispatch(addCommentForSelectedDate(data))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ShiftHistoryForSelectedDay)
