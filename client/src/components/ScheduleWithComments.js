import React, {Component} from 'react'
import {ActionButtons} from "./Buttons";


class ScheduleWithComments extends Component {

  render () {

    const {comments, schedule} = this.props;

    let dataObject = null;
    if (schedule) {
      dataObject =      {
        title : "Смена c " + schedule.start + " до " + schedule.end,
        color : schedule.color
      };
    } else {
      dataObject = {
        title : "Без смены",
        color : "#c7c8ca"
      };
    }

    return (
        <div className="schedule-elem">
          <h2 className="schedule-elem__title">{dataObject.title}</h2>
          <ul className="comment-list">
            {comments
              .map(comment => {
                  let buttons = comment.authorId === this.state.userId ? ActionButtons() : "";

                  return (
                    <li className="comment-list__elem">
                      <h3 className="comment-list__elem-title">
                        {comment.forename} {comment.surname}, {comment.authorPosition}
                      </h3>
                      <div className="comment-list__elem-point">
                        <div className="comment-list__elem-line"></div>
                        <div className="point-big" style={{backgroundColor: dataObject.color}}>
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
}



export default ScheduleWithComments;
