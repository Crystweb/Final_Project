import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Link} from "react-router-dom";
import routes from "../constants/routes";
import picture from "../img/add.png";
import calendar from "../img/calendar.png";
import ScheduleWithComments from './ScheduleWithComments'

class PositionButtons extends Component {
  constructor (props) {
    super(props)
    this.state = {
      view: this.props.currentUser.employee.position.title,
      userId: this.props.currentUser.id,
      colors: ['#eff47f', '#7ff4f1', '#c7c8ca', '#00c7ff']
    }
  }

  setPositionView (event) {
    this.setState({view: event.target.value})
  }

  getRandomColor (indexColors) {
    const colors = ['orange', 'darkkhaki', 'dimgray', 'rosybrown', 'red', 'saddlebrown', 'tan', 'yellowgreen', 'palegreen']

    return colors[indexColors]
  }

  createArrayOfReadyComments (schedulesWithColors, comments) {

    let arrayOfSchedules = schedulesWithColors.map(item => {
      let returnItem = Object.assign({}, item)
      let stringNumberStart = +item.start.toString().substr(0, 2)
      let stringNumberEnd = +item.end.toString().substr(0, 2)

      returnItem.start = stringNumberStart * 60
      returnItem.end = stringNumberEnd * 60
      returnItem.title = 'Смена с ' + stringNumberStart.toString() + ' по ' + stringNumberEnd.toString()

      return returnItem
    }).sort((item1, item2) => {
      if (item1.start > item2.start) return -1
      if (item1.start < item2.start) return 1
      return 0
    })

    let arrayOfReadyComments = []
    let filterComments = comments
      .filter(comment => comment.positions.some(position => position.title === this.state.view))
      .sort((comment1, comment2) => comment2.date - comment1.date)

    if (filterComments.length > 0 && arrayOfSchedules.length > 0) {
      arrayOfReadyComments = this.createCommentsByWhile(arrayOfSchedules, filterComments)
    } else if (filterComments.length > 0 && arrayOfSchedules.length <= 0) {
      arrayOfReadyComments = this.createCommentsWithoutSchedules(filterComments)
    } else {
      arrayOfReadyComments.push(<h1>None</h1>)
    }

    return arrayOfReadyComments
  }

  createCommentsByWhile (inputArrayOfSchedules, filterComments) {

    let time = new Date()
    let startTime = time.getHours() * 60 + time.getMinutes()
    let arrayOfSchedules = this.createArrayWithSortedSchedules(inputArrayOfSchedules, time)
    let resultArray = []
    let commentsInsideSchedule = this.checkCurrentTimeInsideSchedule(arrayOfSchedules, time)
    let currentSchedule = arrayOfSchedules.pop()
    let timeFirstSchedule = currentSchedule.start

    /* eslint-disable */

    while (arrayOfSchedules.length >= 0) {
      if (!commentsInsideSchedule) {
        let sortedComments = filterComments
          .filter(comment => {
            let commentDate = new Date(+comment.date)
            let commentTime = commentDate.getHours() * 60 + commentDate.getMinutes()
            let end = currentSchedule.end
            return (
              (end > startTime && (commentTime < startTime && commentTime <= end))
              ||
              (commentTime > startTime && commentTime >= end)
              ||
              (commentTime < startTime && commentTime >= end)
            )
          })

        if (sortedComments.length > 0) {
          resultArray.push(<ScheduleWithComments comments={sortedComments} schedule={null} userId={this.state.userId}/>)
        }
      } else {
        let sortedComments = filterComments
          .filter(comment => {
            let commentDate = new Date(+comment.date)
            let commentTime = commentDate.getHours() * 60 + commentDate.getMinutes()
            let start = currentSchedule.start
            let end = currentSchedule.end

            return (end > start && start < commentTime && end >= commentTime)
              || (end < start && (start < commentTime || end >= commentTime))
          })

        if (sortedComments.length > 0) {
          resultArray.push(<ScheduleWithComments comments={sortedComments} schedule={currentSchedule} userId={this.state.userId}/>)
        }
        startTime = currentSchedule.start
        if (arrayOfSchedules.length <= 0) {
          break
        }
        currentSchedule = arrayOfSchedules.pop()
      }
      commentsInsideSchedule = !commentsInsideSchedule
    }

    /* eslint-enable */

    if (!commentsInsideSchedule) {
      let sortedComments = filterComments
        .filter(comment => {
          let commentDate = new Date(+comment.date)
          let commentTime = commentDate.getHours() * 60 + commentDate.getMinutes()
          return commentTime > startTime
                 && commentTime <= timeFirstSchedule
        })

      if (sortedComments.length > 0) {
        resultArray.push(<ScheduleWithComments comments={sortedComments} schedule={null} userId={this.state.userId}/>)
      }
    }

    return resultArray
  }

  createCommentsWithoutSchedules (filterComments) {
    let sortedComments = filterComments
    let resultArray = []
    resultArray.push(<ScheduleWithComments comments={sortedComments} schedule={null} userId={this.state.userId}/>)
    return resultArray
  }

  createArrayWithSortedSchedules (inputArrayOfSchedules, time) {

    let startTime = time.getHours() * 60 + time.getMinutes()
    let scheduleWithStartTime = null
    let readySchedules = []
    let indexSchedule = null

    for (let i = 0; i < inputArrayOfSchedules.length; i++) {
      let start = inputArrayOfSchedules[i].start
      let end = inputArrayOfSchedules[i].end

      if ((end > start && start < startTime && end >= startTime) || (end < start && (start < startTime || end >= startTime))) {
        scheduleWithStartTime = inputArrayOfSchedules[i]
        indexSchedule = i
        break
      }
    }

    if (scheduleWithStartTime) {
      let lastSchedule = Object.assign({}, scheduleWithStartTime)
      lastSchedule.start = startTime

      readySchedules.push(lastSchedule)

      for (let i = indexSchedule + 1; i < inputArrayOfSchedules.length; i++) {
        readySchedules.push(inputArrayOfSchedules[i])
      }

      for (let i = 0; i < indexSchedule; i++) {
        readySchedules.push(inputArrayOfSchedules[i])
      }

      let firstSchedule = Object.assign({}, scheduleWithStartTime)
      firstSchedule.end = startTime

      readySchedules.push(firstSchedule)
    } else {

      let nearestTime = Math.abs(inputArrayOfSchedules[0].end - startTime)
      let nearesIndexSchedule = 0

      for (let i = 1; i < inputArrayOfSchedules.length; i++) {
        let difference = Math.abs(inputArrayOfSchedules[i].end - startTime)
        if (nearestTime < difference) {
          nearestTime = difference
          nearesIndexSchedule = i
        }
      }

      for (let i = nearesIndexSchedule + 1; i < inputArrayOfSchedules.length; i++) {
        readySchedules.push(inputArrayOfSchedules[i])
      }

      for (let i = 0; i <= nearesIndexSchedule; i++) {
        readySchedules.push(inputArrayOfSchedules[i])
      }
    }

    return readySchedules
  }

  checkCurrentTimeInsideSchedule (inputArrayOfSchedules, time) {

    let startTime = time.getHours() * 60 + time.getMinutes()

    for (let i = 0; i < inputArrayOfSchedules.length; i++) {
      let start = inputArrayOfSchedules[i].start
      let end = inputArrayOfSchedules[i].end

      if ((end > start && start < startTime && end >= startTime) || (end < start && (start < startTime || end >= startTime))) {
        return true
      }
    }

    return false

  }

  render () {
    const {position, comments, schedules} = this.props

    let indexColors = 0

    const schedulesWithColors = schedules
      .filter(item => item.position.title === this.state.view)
      .map(item => {
        item.color = this.getRandomColor(indexColors++)
        return item
      })

    let readyComments = this.createArrayOfReadyComments(schedulesWithColors, comments)

    const selectPositionInputs = position.filter(position => position.pinnedToComment).map(position => {
        return (
          <li className="position-radio-buttons__elem">
            <label key={position.id}>
              <input name="position"
                     type='radio'
                     defaultChecked={this.state.view === position.title}
                     value={position.title}/>
              <div className="position-radio-buttons__fakeBtn">
                <div className="position-radio-buttons__fakeBtn-active"></div>
              </div>
              <span>{position.title}</span>
            </label>
          </li>
        )
      }
    )

    return (
      <section className="comments">
        <div className="radioANDbuttons">
          <ul className="position-radio-buttons" onChange={this.setPositionView.bind(this)}>
            {selectPositionInputs}
          </ul>
          <div className="add_and_history">
                <Link to={routes.addNewComments.href}>
                  <img alt="add comment" src={picture}/>
                </Link>
                <Link to={routes.commentsHistory.href}>
                  <img alt="calendar is here" src={calendar}/>
                </Link>
          </div>
        </div>

        <div className="positionComments">
          {readyComments}
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

export default connect(mapStateToProps)(PositionButtons)
