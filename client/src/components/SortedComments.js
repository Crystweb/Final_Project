import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Link} from "react-router-dom";
import routes from "../constants/routes";
import picture from "../img/addComment.png";
import calendar from "../img/calendar.png";
import {AxiosInstance as axios} from 'axios'
import {getLastShift} from '../utils/utils'
import {addShift} from '../actions/actions'
import ScheduleWithComments from './ScheduleWithComments'

class PositionButtons extends Component {
  constructor(props) {
    super(props);
    this.state = {
      view: this.props.currentUser.position.title,
      userId: this.props.currentUser.id,
      colors: ['#eff47f', '#7ff4f1', '#c7c8ca', '#00c7ff']
    }
  }

  setPositionView (event) {
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

  createArrayOfReadyComments(schedulesWithColors, comments) {

    let arrayOfSchedules = JSON.parse(JSON.stringify(schedulesWithColors));

    arrayOfSchedules.map(item => {
      let stringNumberStart = +item.start.toString().substr(0, 2);
      let stringNumberEnd = +item.end.toString().substr(0, 2);

      item.start = stringNumberStart * 60;
      item.end = stringNumberEnd * 60;
      item.title = "Смена с " + stringNumberStart.toString() + " по " + stringNumberEnd.toString();
    });
    arrayOfSchedules.sort( (item1, item2) => {
      if (item1.start > item2.start) return -1;
      if (item1.start < item2.start) return 1;
      return 0
    });


    let arrayOfReadyComments = [];
    let filterComments = comments
      .filter(comment => comment.positions.includes(this.state.view))
      .sort( (comment1, comment2) => comment2.date - comment1.date);

    if (filterComments.length > 0 && arrayOfSchedules.length > 0) {
      arrayOfReadyComments = this.createCommentsByWhile(arrayOfSchedules, filterComments)
    } else if (filterComments.length > 0 && arrayOfSchedules.length <= 0) {
      arrayOfReadyComments = this.createCommentsWithoutSchedules(filterComments);
    } else {
      arrayOfReadyComments.push(<h1>None</h1>);
    }

    return arrayOfReadyComments;
}

  createCommentsByWhile(inputArrayOfSchedules, filterComments) {

    let time = new Date();
    let startTime = time.getHours() * 60 + time.getMinutes();
    let arrayOfSchedules = this.createArrayWithSortedSchedules(inputArrayOfSchedules, time);
    let resultArray = [];
    let commentsInsideSchedule = this.checkCurrentTimeInsideSchedule(arrayOfSchedules, time);
    let currentSchedule = arrayOfSchedules.pop();
    let timeFirstSchedule = currentSchedule.start;

    while (arrayOfSchedules.length >= 0) {
      if (!commentsInsideSchedule) {
        let sortedComments = filterComments
          .filter(comment => {
            let commentDate = new Date(+comment.date);
            let commentTime = commentDate.getHours() * 60 + commentDate.getMinutes()
            let end = currentSchedule.end;
            return commentTime < startTime && commentTime >= end
          });

        if (sortedComments.length > 0) {
          resultArray.push(<ScheduleWithComments comments={sortedComments} schedule={null} userId={this.state.userId}/>)
        } else {
          resultArray.push(<h1>Без зміни</h1>)
        }
      } else {
        let sortedComments = filterComments
          .filter(comment => {
            let commentDate = new Date(+comment.date);
            let commentTime = commentDate.getHours() * 60 + commentDate.getMinutes()
            let start = currentSchedule.start;
            let end = currentSchedule.end;

            return (end > start && start  < commentTime && end >= commentTime) || (end < start && (start < commentTime || end >= commentTime))
          });

        if (sortedComments.length > 0) {
          resultArray.push(<ScheduleWithComments comments={sortedComments} schedule={currentSchedule} userId={this.state.userId}/>)
        } else {
          resultArray.push(<h1>Порожня зміна {currentSchedule.start} до {currentSchedule.end}</h1>)
        }
        startTime = currentSchedule.start;
        if (arrayOfSchedules.length <= 0) {
          break;
        }
        currentSchedule = arrayOfSchedules.pop();
      }
      commentsInsideSchedule = !commentsInsideSchedule;
    }

    if (!commentsInsideSchedule) {
      let sortedComments = filterComments
        .filter(comment => {
          let commentDate = new Date(+comment.date);
          let commentTime = commentDate.getHours() * 60 + commentDate.getMinutes()
          return commentTime > startTime && commentTime <= timeFirstSchedule
        });

      if (sortedComments.length > 0) {
        resultArray.push(<ScheduleWithComments comments={sortedComments} schedule={null} userId={this.state.userId}/>)
      } else {
        resultArray.push(<h1>Порожня остання зміна</h1>)
      }
    }

    return resultArray;
  }

  createCommentsWithoutSchedules(filterComments) {
    let sortedComments = filterComments;
    let resultArray = [];
    resultArray.push(<ScheduleWithComments comments={sortedComments} schedule={null} userId={this.state.userId}/>)
    return resultArray
  }

  createArrayWithSortedSchedules(inputArrayOfSchedules, time) {

    let startTime = time.getHours() * 60 + time.getMinutes();
    let scheduleWithStartTime = null
    let readySchedules = []
    let indexSchedule = null

    for (let i = 0; i < inputArrayOfSchedules.length; i++) {
      if (startTime > inputArrayOfSchedules[i].start && startTime <= inputArrayOfSchedules[i].end) {
        scheduleWithStartTime = inputArrayOfSchedules[i]
        indexSchedule = i;
        break
      }
    }

    if (scheduleWithStartTime) {
      let lastSchedule = Object.assign({}, scheduleWithStartTime);
      lastSchedule.start = startTime;
      lastSchedule.title += "// діапазон з " + lastSchedule.start  + " по " + lastSchedule.end

      readySchedules.push(lastSchedule);

      for (let i = indexSchedule + 1; i < inputArrayOfSchedules.length; i++) {
        readySchedules.push(inputArrayOfSchedules[i]);
      }

      for (let i = 0; i < indexSchedule; i++) {
        readySchedules.push(inputArrayOfSchedules[i])
      }

      let firstSchedule = Object.assign({}, scheduleWithStartTime);
      firstSchedule.end = startTime;
      firstSchedule.title  += "// діапазон з " + firstSchedule.start  + " по " + firstSchedule.end

      readySchedules.push(firstSchedule);
    } else {
      
      let nearestTime = Math.abs(inputArrayOfSchedules[0].end - startTime);
      let nearesIndexSchedule = 0;

      for (let i = 1; i < inputArrayOfSchedules.length; i++) {
        let difference = Math.abs(inputArrayOfSchedules[i].end - startTime)
        if (nearestTime < difference) {
          nearestTime = difference;
          nearesIndexSchedule = i;
        }
      }

      for (let i = nearesIndexSchedule + 1; i < inputArrayOfSchedules.length; i++) {
        readySchedules.push(inputArrayOfSchedules[i]);
      }

      for (let i = 0; i <= nearesIndexSchedule; i++) {
        readySchedules.push(inputArrayOfSchedules[i])
      }
    }

    return readySchedules
  }

  checkCurrentTimeInsideSchedule(inputArrayOfSchedules, time) {

    let startTime = time.getHours() * 60 + time.getMinutes();

    for (let i = 0; i < inputArrayOfSchedules.length; i++) {
      if (startTime >= inputArrayOfSchedules[i].start && startTime < inputArrayOfSchedules[i].end) {
        return true;
      }
    }

    return false;

  }

  render() {
    const {position, comments, schedules} = this.props;

    const schedulesWithColors = schedules
      .filter(item => item.position.title === this.state.view)
      .map(item => {
        item.color = this.getRandomColor()
        return item;
      })



    let functionAnswer = this.createArrayOfReadyComments(schedulesWithColors, comments);

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
          {functionAnswer}
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
