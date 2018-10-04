import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Timeline, TimelineEvent} from 'react-event-timeline'
import {Link} from 'react-router-dom'
import routes from '../constants/routes'
import picture from '../img/addComment.png'
import update from '../img/update.png'
import trash from '../img/trash.png'
import calendar from '../img/calendar.png'
import axios from 'axios'
import {getLastShift} from '../utils/utils'
import {addShift} from '../actions/actions'
import actionButtons from './Buttons'

class PositionButtons extends Component {

  constructor (props) {
    super(props)
    this.state = {
      view: this.props.currentUser.position.title,
      userId: this.props.currentUser.id,
      colors: ['#eff47f', '#7ff4f1', '#c7c8ca', '#00c7ff']
    }
  }

  setPositionView (event) {
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


  getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  createNessesaryDataForComments(schedulesWithColors, comments) {
    let CommentsInsideSchedule = false;
  }

  getReadyArrayOfCommentsWithHTML() {

  }

  render() {
    const {position, comments, schedules} = this.props;

    const schedulesWithColors = schedules
      .filter(item => item.position.title === this.state.view)
      .map(item => {
        item.color = this.getRandomColor()
        return item;
      })

    let arrayOfSchedules = JSON.parse(JSON.stringify(schedulesWithColors));

    arrayOfSchedules.map(item => {
      let stringNumberStart = item.start.toString().substr(0, 2);
      let stringNumberEnd = item.end.toString().substr(0, 2);

      item.start = parseInt(stringNumberStart);
      item.end = parseInt(stringNumberEnd);
    }).sort( (item1, item2) => item1.start - item2.start);



    let currentSchedule = arrayOfSchedules.pop();
    let startTime = 0;
    let CommentsInsideSchedule = false;
    let arrayOfReadyComments = [];
    let colorForCommentsWithoutSchedule = "#c7c8ca";
    let filterComments = comments
      .filter(comment => comment.positions.includes(this.state.view))
      .sort( (comment1, comment2) => comment1.date - comment2.date);

    if (currentSchedule && comments) {

      while (arrayOfSchedules.length >= 0) {

        if (!CommentsInsideSchedule) {

          let sortedComments = filterComments
            .filter(comment => {
              let commentStartHours = new Date(comment.date).getHours();

              return commentStartHours >= startTime && commentStartHours < currentSchedule.start

            });

          if (sortedComments.length > 0) {
            arrayOfReadyComments.push(
              <div className="schedule-elem">
                <h2 className="schedule-elem__title">Без смены</h2>
                <ul className="comment-list">
                  {sortedComments
                    .map(comment => {
                        let buttons = comment.authorId === this.state.userId ? actionButtons : "";

                        return (
                          <li className="comment-list__elem">
                            <h3 className="comment-list__elem-title">
                              {comment.forename} {comment.surname}, {comment.authorPosition}
                            </h3>
                            <div className="comment-list__elem-point">
                              <div className="comment-list__elem-line"></div>
                              <div className="point-big" style={{backgroundColor: colorForCommentsWithoutSchedule}}>
                                <div className="point-small"></div>
                              </div>
                            </div>
                            <h4 className="comment-list__elem-subtitle">
                              {new Date(parseInt(comment.date)).getHours()}
                            </h4>
                            <p className="comment-list__elem-info">
                              {comment.text}
                            </p>
                            {buttons}
                          </li>
                        )
                      }
                    )

                  }
                </ul>
              </div>
            )
          }
          CommentsInsideSchedule = !CommentsInsideSchedule;
        } else {

          let sortedComments = filterComments
            .filter(comment => {
              let commentStartHours = new Date(comment.date).getHours();

              return commentStartHours >= currentSchedule.start && commentStartHours < currentSchedule.end;

            }).sort((comment1, comment2) => {
              let comment1StartHours = new Date(comment1.date).getHours();
              let comment2StartHours = new Date(comment2.date).getHours();

              return comment1StartHours - comment2StartHours;
            });

          if (sortedComments.length > 0) {

            arrayOfReadyComments.push(
              <div className="schedule-elem">
                <h2 className="schedule-elem__title">Смена
                  с {currentSchedule.start} до {currentSchedule.end}</h2>
                <ul className="comment-list">
                  {sortedComments
                    .map(comment => {

                      let buttons = comment.authorId === this.state.userId ? actionButtons : "";

                      let colorSchedule = currentSchedule.color
                      return (
                        <li className="comment-list__elem">
                          <h3 className="comment-list__elem-title">
                            {comment.forename} {comment.surname}, {comment.authorPosition}
                          </h3>
                          <div className="comment-list__elem-point" >
                            <div className="comment-list__elem-line"></div>
                            <div className="point-big" style={{backgroundColor: colorSchedule}}>
                              <div className="point-small"></div>
                            </div>
                          </div>
                          <h4 className="comment-list__elem-subtitle">
                            {new Date(parseInt(comment.date)).getHours()}
                          </h4>
                          <p className="comment-list__elem-info">
                            {comment.text}
                          </p>
                          {buttons}
                        </li>
                      )
                    })
                  }
                </ul>
              </div>
            );

            CommentsInsideSchedule = !CommentsInsideSchedule;
            startTime = currentSchedule.end;

            if (arrayOfSchedules.length === 0) {
              break;
            }

            currentSchedule = arrayOfSchedules.pop();
          } else {
            CommentsInsideSchedule = !CommentsInsideSchedule;
            startTime = currentSchedule.end;

            if (arrayOfSchedules.length === 0) {
              break;
            }

            currentSchedule = arrayOfSchedules.pop();
          }
        }
      }

      //after while = last comments
      let sortedComments = comments
        .filter(comment => {
          for (let i = 0; i < comment.positions.length; i++) {
            if (comment.positions[i] === this.state.view) {
              return true;
            }
          }
          return false;
        })
        .filter(comment => {
          let commentStartHours = new Date(comment.date).getHours();


          return commentStartHours >= startTime

        })
      arrayOfReadyComments.push(
        <div className="schedule-elem">
          <h2 className="schedule-elem__title">Без смены</h2>
          <ul className="comment-list">
            {sortedComments
              .sort((comment1, comment2) => {
                let comment1StartHours = new Date(comment1.date).getHours();
                let comment2StartHours = new Date(comment2.date).getHours();

                return comment1StartHours - comment2StartHours;
              }).map(comment => {

                let buttons = comment.authorId === this.state.userId ? actionButtons : ""

                return (
                  <li className="comment-list__elem">
                    <h3 className="comment-list__elem-title">
                      {comment.forename} {comment.surname}, {comment.authorPosition}
                    </h3>
                    <div className="comment-list__elem-point">
                      <div className="comment-list__elem-line"></div>
                      <div className="point-big" style={{backgroundColor: colorForCommentsWithoutSchedule}}>
                        <div className="point-small"></div>
                      </div>
                    </div>
                    <h4 className="comment-list__elem-subtitle">
                      {new Date(parseInt(comment.date)).getHours()}
                    </h4>
                    <p className="comment-list__elem-info">
                      {comment.text}
                    </p>
                    {buttons}
                  </li>
                )
              })}
          </ul>
        </div>
      );

    } else {
      arrayOfReadyComments = [];
      arrayOfReadyComments.push(
        <h1>None</h1>
      )
    }





    const timelineEvents = [];

    for (let i = new Date().getHours(); i >= 0; i--) {
      const shift = schedulesWithColors.find(item => {
        const start = parseInt(item.start, 10);
        const end = parseInt(item.end, 10);
        return (end > start && start <= i && end > i) || (end < start && (start <= i || end > i))
      });
      if (timelineEvents === null) {
        return
      }
      timelineEvents.push(
        <TimelineEvent createdAt={`${i}:00`} key={i} title='' iconColor={shift && shift.color}>
          {comments
            .filter(comment => comment.authorPosition === this.state.view) // need another algorithm
            .filter(comment => new Date(comment.date).getHours() === i)
            .map(comment => {
              const showActionButtons = comment.authorId === this.state.userId
              // const isShowing = ({comments.[0] == undefined} === true)
              return (
                <li key={comment.id}>
                  <div className='flex_comment'>
                    <div className='comment'>
                      <h3>{comment.forename} {comment.surname}, {comment.authorPosition}</h3>
                      <h5>{`${i}:00`}</h5>
                      <h4>{comment.text}</h4>
                    </div>
                    <div className='ud_buttons'>
                      {showActionButtons &&
                      <button onClick={() => this.deleteComment(comment.id)}><img alt='trash' src={trash}/>
                      </button>}
                      {showActionButtons &&
                      <button><Link to={routes.updateComment.href + comment.id}><img alt='update'
                                                                                     src={update}/></Link>
                      </button>}
                    </div>
                  </div>
                </li>
              )
            })
            .reverse()}
        </TimelineEvent>
      )
    }

    const selectPositionInputs = position.map(position => {
        const isForComment = position.pinnedToComment === true
        return (
          <div key={position.id}>
            {isForComment && <li key={position.id}>
              <input name="position"
                     type='radio'
                     defaultChecked={this.state.view === position.title}
                     value={position.title}/>
              {position.title}
            </li>}
          </div>)
      }
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
        <div className="positionComments">
          {arrayOfReadyComments}
        </div>
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
