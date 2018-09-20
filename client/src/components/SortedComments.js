import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Timeline, TimelineEvent} from 'react-event-timeline'
import {Link} from "react-router-dom";
import routes from "../constants/routes";
import picture from "../img/addComment.png";
import calendar from "../img/calendar.png";
import { AxiosInstance as axios } from 'axios'
import { getLastShift } from '../utils/Utills'
import { addShift } from '../actions/actions'

class PositionButtons extends Component {
  constructor (props) {
    super(props)
    this.state = {
      view: this.props.currentUser.position.title,
      userId: this.props.currentUser.id
    }
  }

    setPositionView(event) {
        this.setState({view: event.target.value})
    }

  deleteComment (id) {
    if (window.confirm('Вы уверены, что хотите удалить комментарий?')) {
      axios.delete(`/workshift/comment/${id}`)
        .then(() => getLastShift(data => {
          this.props.addShift(data)
        }))
    }
  }

  render () {
    const {position, comments} = this.props

    let positionComments = comments
      .filter(comment => comment.positions.includes(this.state.view))
      .reverse()
      .map(comment => {
        const showActionButtons = comment.authorId === this.state.userId
        return (
          <TimelineEvent key={comment.id} title='shifts' createdAt={new Date(comment.date).toLocaleTimeString()}>
            <li key={comment.id}>
              <h5>{comment.forename} {comment.surname}, {comment.authorPosition}</h5>
              <h3>{comment.text}</h3>
              {showActionButtons && <button onClick={() => this.deleteComment(comment.id)}>delete comment</button>}
              {showActionButtons &&
              <button><Link to={routes.updateComment.href + comment.id}>update comment</Link></button>}
            </li>
          </TimelineEvent>
        )
      })

    const selectPositionInputs = position.map(position =>
      <li key={position.id}>
        <input name="position"
          type='radio'
          defaultChecked={this.state.view === position.title}
          value={position.title}/>
        {position.title}
      </li>
    )

        return (
            <section className="comments">
                <div className="radioANDbuttons">
                    <div className="position-radio-buttons" onChange={this.setPositionView.bind(this)}>
                        {selectPositionInputs}
                    </div>
                    <div className="add_and_history">
                        <nav>
                            <ul>
                                <li><Link to={routes.addNewComments.href}>
                                    <img alt="add comment" src={picture}/>
                                </Link>
                                </li>
                                <li><Link to={routes.commentsHistory.href}>
                                    <img alt="calendar is here" src={calendar}/>
                                </Link>
                                </li>
                            </ul>
                        </nav>
                    </div>
                </div>
                <Timeline>
                    <div className="positionComments">
                        {positionComments}
                    </div>
                </Timeline>
            </section>
        )
    }
}

const mapStateToProps = ({startData}) => {
  return {
    position: startData.positions,
    currentUser: startData.currentUser
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    addShift: (data) => {
      dispatch(addShift(data))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PositionButtons)
