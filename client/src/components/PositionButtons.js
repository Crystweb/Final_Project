import React, { Component } from 'react'
import { connect } from 'react-redux'

class PositionButtons extends Component {
  constructor (props) {
    super(props)
    this.state = {
      view: null
    }
  }
  setPositionView (event) {
    this.setState({view: event.target.value})
  }

  render () {
    const {position, comments} = this.props
    console.log(comments)
    let positionComments = []
    for (let i = 0; i < comments.length; i++) {
      let currentComment = comments[i]
      for (let i = 0; i < currentComment.length; i++) {
        positionComments = currentComment.filter(position[i].title.contains(this.state.view))
      }
    }
    const selectPositionInputs = position.map(position =>
      <p><input name="position" type='radio' key={position.id} value={position.title}/>{position.title}</p>)

    return (
      <section className="comments">
        <div onChange={this.setPositionView.bind(this)}>
          {selectPositionInputs}
        </div>
        {positionComments}
      </section>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    position: state.user.positions
  }
}

export default connect(mapStateToProps)(PositionButtons)
