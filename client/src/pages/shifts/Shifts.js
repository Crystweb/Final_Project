import React, { Component } from 'react'
import '../../styles/Comments.css'
import Preloader from '../../components/Preloader'
import { getLastShift } from '../../utils/Utills'
import { connect } from 'react-redux'
import { addShift } from '../../actions/actions'
import SortedComments from '../../components/SortedComments'

class Shifts extends Component {

  constructor (props) {
    super(props)
    this.state = {
      view: this.props.user.position.title
    }
  }

  componentDidMount () {
    getLastShift(data => {
      this.props.addShift(data)
    })
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

const mapStateToProps = ({comments, startData}) => {
  return {
    lastComments: comments.lastComments,
    currentSchedules: startData.schedules,
    user: startData.currentUser
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    addShift: (data) => {
      dispatch(addShift(data))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Shifts)
