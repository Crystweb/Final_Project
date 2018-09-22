import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Timeline, TimelineEvent} from 'react-event-timeline'
import {Link} from "react-router-dom";
import routes from "../constants/routes";
import picture from "../img/addComment.png";
import calendar from "../img/calendar.png";
import {AxiosInstance as axios} from 'axios'
import {getLastShift} from '../utils/Utills'
import {addShift} from '../actions/actions'

class PositionButtons extends Component {
  constructor(props) {
    super(props);
    this.state = {
      view: this.props.currentUser.position.title,
      userId: this.props.currentUser.id,
      colors: ['#eff47f', '#7ff4f1', '#c7c8ca', '#00c7ff']
    }
  }

  setPositionView(event) {
    this.setState({view: event.target.value})
  }

  deleteComment(id) {
    if (window.confirm('Вы уверены, что хотите удалить комментарий?')) {
      axios.delete(`/workshift/comment/${id}`)
        .then(() => getLastShift(data => {
          this.props.addShift(data)
        }))
    }
  }

  getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  render() {
    const {position, comments, schedules} = this.props;

    const schedulesWithColors = schedules
      .filter(item => item.position.title === this.state.view)
      .map(item => {
        item.color = this.getRandomColor()
        return item;
      })

    const timelineEvents = [];
    // shiftColors = shifts.map(shift => {
    //     shift: shift,
    //         color: getColor(shift)
    // })

    // color => color.shift.start < i && color.shift.end > i).color


    // 24 or new Date().getHours()
    for (let i = new Date().getHours(); i >= 0; i--) {
      const shift = schedulesWithColors.find(item => {
        const start = parseInt(item.start);
        const end = parseInt(item.end);
        return (end > start && start <= i && end > i) || (end < start && (start <= i || end > i))
      });
      // const backgroundStyle = {
      //   backgroundColor: shift && shift.color
      // };

      timelineEvents.push(
        <TimelineEvent createdAt={`${i}:00`} key={i} title='' iconColor={shift && shift.color}>
          {comments
            .filter(comment => new Date(comment.date).getHours() === i)
            .map(comment => {
              const showActionButtons = comment.authorId === this.state.userId
              return (
                <li key={comment.id}>
                  <h5>{comment.forename} {comment.surname}, {comment.authorPosition}</h5>
                  <h3>{comment.text}</h3>
                  {showActionButtons &&
                  <button onClick={() => this.deleteComment(comment.id)}>delete comment</button>}
                  {showActionButtons &&
                  <button><Link to={routes.updateComment.href + comment.id}>update comment</Link>
                  </button>}
                </li>
              )
            })
            .reverse()}
        </TimelineEvent>
      )
    }
    console.log(this.state.userId)
    // let positionComments = comments
    //   .filter(comment => comment.positions.includes(this.state.view))
    //   .reverse()
    //   .map(comment => {
    //     const showActionButtons = comment.authorId === this.state.userId
    //     return (
    //       <TimelineEvent key={comment.id} title='shifts' createdAt={new Date(comment.date).toLocaleTimeString()}>
    //         <li key={comment.id}>
    //           <h5>{comment.forename} {comment.surname}, {comment.authorPosition}</h5>
    //           <h3>{comment.text}</h3>
    //           {showActionButtons && <button onClick={() => this.deleteComment(comment.id)}>delete comment</button>}
    //           {showActionButtons &&
    //           <button><Link to={routes.updateComment.href + comment.id}>update comment</Link></button>}
    //         </li>
    //       </TimelineEvent>
    //     )
    //   })

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
            {timelineEvents}
          </div>
        </Timeline>
      </section>
    )
  }
}

const mapStateToProps = ({startData}) => {
  return {
    position: startData.positions,
    currentUser: startData.currentUser,
    schedules: startData.schedules
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
