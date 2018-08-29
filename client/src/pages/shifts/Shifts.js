import React, { Component } from 'react'
import '../../styles/Comments.css'
import Preloader from '../../components/Preloader'
import routes from '../../constants/routes'
import { Link } from 'react-router-dom'
import { getLastShift } from '../../utils/Utills'
import { connect } from 'react-redux'
import { addShift } from '../../actions/actions'

class Shifts extends Component {
  componentDidMount () {
    getLastShift(data => {
      this.props.addShift(data)
    })
  }

  render () {
    if (!this.props.lastShift) {
      return (
        <div>
          <Preloader/>
        </div>
      )
    } else {
      return (
        <div className="container">
          <section className="comments">
            <h2>{this.props.lastShift && this.props.lastShift.map(shift =>
              <li key={shift.id}>
                <h2>{shift.start} - {shift.end}</h2>
                {shift.shiftComments.map(comment =>
                  <li key={comment.id}>
                    <h3>{comment.message}</h3>
                    <h6>{comment.date}</h6>
                  </li>)}
              </li>
            )}</h2>
          </section>
          <nav className="navigation">
            <ul>
              <li><Link to={routes.addNewComments.href}>{routes.addNewComments.name}</Link></li>
              <li><Link to={routes.commentsHistory.href}>{routes.commentsHistory.name}</Link></li>
            </ul>
          </nav>
        </div>
      )
    }
  }
}

const mapStateToProps = (state) => {
  return {lastShift: state.shift.lastShift}
}

const mapDispatchToProps = (dispatch) => {
  return {
    addShift: (data) => {
      dispatch(addShift(data))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Shifts)
