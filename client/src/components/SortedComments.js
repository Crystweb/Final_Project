import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Timeline, TimelineEvent } from 'react-event-timeline'

class PositionButtons extends Component {
  constructor (props) {
    super(props)
    this.state = {
      view: 'admin'
    }
  }

  setPositionView (event) {
    this.setState({view: event.target.value})
  }

  checkPosition (position) {
    if (position === this.state.view) {

    }
  }

  render () {
    const {position, comments} = this.props
    let positionComments = comments
      .filter(comment => comment.positions.includes(this.state.view))
      .reverse()
      .map(comment =>
        <TimelineEvent createdAt={new Date(comment.date).toLocaleTimeString()}>
          <li key={comment.id}>
            <h5>{comment.forename} {comment.surname}, {comment.authorPosition}</h5>
            <h3>{comment.text}</h3>
          </li>
        </TimelineEvent>
      )

    const selectPositionInputs = position.map(position =>
      <li key={position.id}>
        <input name="position"
          type='radio'
          checked={this.state.view === position.title}
          value={position.title}/>
        {position.title}
      </li>
    )

    return (
      <section className="comments">
        <div className="position-radio-buttons" onChange={this.setPositionView.bind(this)}>
          {selectPositionInputs}
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
    position: startData.positions
  }
}

export default connect(mapStateToProps)(PositionButtons)
