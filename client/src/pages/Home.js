import React, { Component } from 'react'
import routes from '../constants/routes'
import { Link } from 'react-router-dom'
import '../styles/Home.css'
import connect from 'react-redux/es/connect/connect'
import { deleteCurrentFloor } from '../actions/actions'

class Home extends Component {
  componentDidMount () {
    this.props.currentFloor && this.props.deleteCurrentFloor()
  }

  render () {
    return (
      <div className="container">
        <nav className="navigation">
          <Link to={routes.comments.href}>{routes.comments.name}</Link>
          <Link to={routes.tasks.href}>{routes.tasks.name}</Link>
          <Link to={routes.roomCheckIn.href}>{routes.roomCheckIn.name}</Link>
          <Link to={routes.employees.href}>{routes.employees.name}</Link>
        </nav>
      </div>
    )
  }
}

const mapStateToProps = ({checkIn}) => {
  return {
    currentFloor: checkIn.floorId
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    deleteCurrentFloor: () => {
      dispatch(deleteCurrentFloor())
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)
