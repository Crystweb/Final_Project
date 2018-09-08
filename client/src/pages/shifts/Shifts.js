import React, { Component } from 'react'
import '../../styles/Comments.css'
import Preloader from '../../components/Preloader'
import routes from '../../constants/routes'
import { Link } from 'react-router-dom'
import { getLastShift } from '../../utils/Utills'
import { connect } from 'react-redux'
import { addShift } from '../../actions/actions'
import SortedComments from '../../components/SortedComments'
import picture from '../../img/addComment.png'

class Shifts extends Component {
  constructor (props) {
    super(props)
    this.state = {
      view: 'manager'
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
          <nav>
            <ul>
              <li><Link to={routes.addNewComments.href}>
                <img alt="add comment" src={picture}/>
              </Link>
              </li>
              <li><Link to={routes.commentsHistory.href}>{routes.commentsHistory.name}</Link></li>
            </ul>
          </nav>
        </div>
      )
    }
  }
}

const mapStateToProps = ({comments, startData}) => {
  return {
    lastComments: comments.lastComments,
    currentSchedules: startData.schedules
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
