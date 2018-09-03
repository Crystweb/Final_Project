import React, { Component } from 'react'
import '../../styles/Comments.css'
import Preloader from '../../components/Preloader'
import routes from '../../constants/routes'
import { Link } from 'react-router-dom'
import { getLastShift } from '../../utils/Utills'
import { connect } from 'react-redux'
import { addShift } from '../../actions/actions'

class Shifts extends Component {
  constructor (props) {
    super(props)
    this.state = {
      view: null
    }
  }

  componentDidMount () {
    getLastShift(data => {
      this.props.addShift(data)
    })
  }

  setPositionView (event) {
    this.setState({view: event.target.value})
  }

  render () {

    if (!this.props.lastComments) {
      return (
        <div>
          <Preloader/>
        </div>
      )
    } else {
      const {position, lastComments} = this.props
      let positionComments = []
      for (let i = 0; i < lastComments.length; i++) {
        let currentComment = lastComments[i]
        for (let i = 0; i < currentComment.length; i++) {
          positionComments = currentComment.filter(position[i].title.contains(this.state.view))
        }
        console.log(positionComments)
      }
      const selectPositionInputs = position.map(position =>
        <p><input name="position" type='radio' key={position.id} value={position.title}/>{position.title}</p>)
      return (
        <div className="container">
          <section className="comments">
            <div onChange={this.setPositionView.bind(this)}>
              {selectPositionInputs}
            </div>
            {positionComments}
          </section>
          <nav className="navigation">
            <ul>
              <li><Link to={routes.addNewComments.href}>{routes.addNewComments.name}</Link></li>
              <li><Link to={routes.commentsHistory.href}>{routes.commentsHistory.name}</Link></li>
            </ul>
          </nav>
        </div>
      )
    }
  }
}

const mapStateToProps = (state) => {
  return {
    lastComments: state.shift.lastComments,
    position: state.user.positions
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    addShift: (data) => {
      dispatch(addShift(data))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Shifts)
