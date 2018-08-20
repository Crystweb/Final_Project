import React, { Component } from 'react'
import routes from '../../constants/routes'
import { connect } from 'react-redux'

class ShiftHistoryAdmin extends Component {

  render () {
    return (
      <div>
        <h5>{this.props.date}</h5>
        <h6>{routes.shiftHistoryAdmin.name}</h6>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {date: state.shiftHistorySelectedDate.selectedDate}
}

export default connect(mapStateToProps)(ShiftHistoryAdmin)
