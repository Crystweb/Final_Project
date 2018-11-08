import React, { Component } from 'react'
import './styles/App.css'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import {
  addAllLocation,
  addAllPositions,
  addAllSchedules,
  addAllUsers,
  addCurrentUser,
  addFrequencies,
  addShift,
  addTasks,
  addTaskStatuses, downloadUser
} from './actions/actions'
import Preloader from './components/Preloader'
import { startData } from './utils/utils'
import Navigation from './components/Navigation'
import SignIn from './pages/authentication/SignIn'
import axios from 'axios'
import WsHandler from './components/WsHandler'


class App extends Component {
  componentDidMount () {
    startData(
      data => { this.props.addAllPositions(data) },
      data => { this.props.addSchedules(data) },
      data => { this.props.addAllLocation(data) },
      data => { this.props.addShift(data) },
      data => { this.props.addStatuses(data) },
      data => { this.props.addFrequencies(data) },
      data => { this.props.addAllUsers(data) },
      data => { this.props.addTasks(data) }
    )
    this.props.userDownloadStatus(false)
    axios.get('/test/user')
      .then(response => this.props.addUser(response.data))
      .then(() => this.props.userDownloadStatus(true));

  }

  render () {
    const {schedules, positions, comments, locations, frequencies, allTasks, isUserDownloaded, statuses} = this.props
    // if (!schedules || !positions || !comments || !locations || !frequencies || !allTasks || !statuses) {
    //   return (
    //     <Preloader/>
    //   )
    // }
    if (!isUserDownloaded) {
      return (
        <SignIn/>
      )
    }
    return (
      <div className="container">
        <WsHandler allComments={comments} allTasks={allTasks}/>
        <Navigation header={true}/>
        <Navigation/>
      </div>
    )
  }
}

const mapStateToProps = ({comments, startData, tasks}) => {
  return {
    user: startData.currentUser,
    positions: startData.positions,
    schedules: startData.schedules,
    comments: comments.lastComments,
    locations: startData.locations,
    statuses: startData.statuses,
    frequencies: startData.frequencies,
    allTasks: tasks.allTasks,
    isUserDownloaded: startData.userDownload
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    addUser: data => dispatch(addCurrentUser(data)),
    addAllPositions: data => dispatch(addAllPositions(data)),
    addSchedules: data => dispatch(addAllSchedules(data)),
    addAllLocation: data => dispatch(addAllLocation(data)),
    addShift: data => dispatch(addShift(data)),
    addStatuses: data => dispatch(addTaskStatuses(data)),
    addFrequencies: data => dispatch(addFrequencies(data)),
    addAllUsers: data => dispatch(addAllUsers(data)),
    addTasks: data => dispatch(addTasks(data)),
    userDownloadStatus: data => dispatch(downloadUser(data))
  }
}



export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App))
