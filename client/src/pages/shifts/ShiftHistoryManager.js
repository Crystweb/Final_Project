import React, { Component } from 'react'

import { connect } from 'react-redux'
import routes from '../../constants/routes'

class ShiftHistoryManager extends Component {

  render () {
    return (
      <div>
        <h5>{this.props.date}</h5>
        <h6>{routes.shiftHistoryManager.name}</h6>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {date: state.shiftHistorySelectedDate.selectedDate}
}

export default connect(mapStateToProps)(ShiftHistoryManager)
