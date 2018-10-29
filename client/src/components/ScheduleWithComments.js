import React, {Component} from 'react'
import ActionButtons from './ActionButtons'
import dateFormat from 'dateformat'

class ScheduleWithComments extends Component {
  render () {
    const {comments, schedule, userId} = this.props
    let dataObject = null
    if (schedule) {
      dataObject = {
        title: schedule.title,
        color: schedule.color
      }
    } else {
      dataObject = {
        title: 'Без смены',
        color: '#c7c8ca'
      }
    }

    return (
      <div className="schedule-elem">
        <h2 className="schedule-elem__title">{dataObject.title}</h2>
        <ul className="comment-list">
          {comments
            .map(comment => {
              let buttons = comment.author.id === userId ? <ActionButtons comment={comment.id}/> : ''
              let time = new Date(+comment.date)

              let readyTime = dateFormat(time, 'dd mmmm в HH:MM')

              return (
                <li className="comment-list__elem">
                  <h3 className="comment-list__elem-title">
                    {comment.author.forename} {comment.author.surname}, {comment.author.position.title}
                  </h3>
                  <div className="comment-list__elem-point">
                    <div className="comment-list__elem-line"></div>
                    <div className="point-big" style={{backgroundColor: dataObject.color}}>
                      <div className="point-small"></div>
                    </div>
                  </div>
                  <h4 className="comment-list__elem-subtitle">
                    {readyTime}
                  </h4>
                  <p className="comment-list__elem-info">
                    {comment.message}
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
}

export default ScheduleWithComments
