import React, { Component } from 'react'
import { connect } from 'react-redux'
import routes from '../../constants/routes'
import { Link } from 'react-router-dom'

class ShiftHistoryForSelectedDay extends Component {

  render () {
    return (
      <div className="container">
        <h3>{this.props.date.getDay}</h3>
        <nav className='navigation'>
          <ul>
            <li><Link to={routes.shiftHistoryManager.href}>{routes.shiftHistoryManager.name}</Link></li>
            <li><Link to={routes.shiftHistoryAdmin.href}>{routes.shiftHistoryAdmin.name}</Link></li>
          </ul>
        </nav>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {date: state.shiftHistorySelectedDate.selectedDate}
}

export default connect(mapStateToProps)(ShiftHistoryForSelectedDay)
