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
    // let positionComments = []
    // console.log(positionComments)
    // for (let i = 0; i < comments.length; i++) {
    //   let currentComment = comments[i]
    //   for (let i = 0; i < currentComment.length; i++) {
    //     positionComments = currentComment.filter(function(position[i].title) {return position[i].title === this.state.view})
    //   }
    // }
    const selectPositionInputs = position.map(position =>
      <li key={position.id}><input name="position" type='radio' value={position.title}/>{position.title}</li>)
    console.log(this.state.view)
    return (
      <section className="comments">
        <div onChange={this.setPositionView.bind(this)}>
          {selectPositionInputs}
        </div>
        {/*{positionComments}*/}
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
