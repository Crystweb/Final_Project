import React, { Component } from 'react'
import '../../styles/Comments.css'
import Preloader from '../../components/Preloader'
import { connect } from 'react-redux'
import { deleteDate } from '../../actions/actions'
import SortedComments from '../../components/SortedComments'

class Shifts extends Component {
  constructor (props) {
    super(props)
    this.state = {
      view: this.props.user.employee.position.title
    }
  }

  componentDidMount () {
    this.props.date && this.props.deleteSelectedDate()
  }
  render () {
    if (!this.props.lastComments) {
      return (
        <div>
          <Preloader/>
        </div>
      )
    } else {
      return (
        <div className="container">
          <SortedComments comments={this.props.lastComments}/>
        </div>
      )
    }
  }
}

const mapStateToProps = ({comments, startData, selectedDate}) => {
  return {
    lastComments: comments.lastComments,
    currentSchedules: startData.schedules,
    user: startData.currentUser,
    date: selectedDate.historySelectedDate
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    deleteSelectedDate: () => dispatch(deleteDate())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Shifts)
