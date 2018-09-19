import React, { Component } from 'react'
import './styles/App.css'
import Home from './pages/Home'
import { Link, Route, Switch, withRouter } from 'react-router-dom'
import Comments from './pages/shifts/Shifts'
import ShiftsHistory from './pages/shifts/ShiftsHistory'
import CreateNewComments from './pages/shifts/CreateNewShift'
import Tasks from './pages/Tasks'
import TasksForHotel from './pages/tasks/TasksForHotel'
import TasksForKitchen from './pages/tasks/TasksForKitchen'
import TasksForFirstRestaurant from './pages/tasks/TasksForFirstRestaurant'
import TasksForSecondRestaurant from './pages/tasks/TasksForSecondRestaurant'
import TasksOfCyclic from './pages/tasks/TasksOfCyclic'
import MyTasks from './pages/tasks/MyTasks'
import Employees from './pages/Employees'
import EmployeeList from './pages/EmployeeList'
import Vacancies from './pages/Vacancies'
import WashingData from './pages/WashingData'
import SalesNumbers from './pages/washingDate/SalesNumbers'
import Lodgers from './pages/washingDate/Lodgers'
import routes from './constants/routes'
import { connect } from 'react-redux'
import { addAllLocation, addAllPositions, addAllSchedules, addCurrentUser, addShift } from './actions/actions'
import Preloader from './components/Preloader'
import { startData } from './utils/Utills'

class App extends Component {
  componentDidMount () {
    startData(
      data => { this.props.addUser(data) },
      data => { this.props.addAllPositions(data) },
      data => { this.props.addSchedules(data) },
      data => { this.props.addAllLocation(data) },
      data => { this.props.addShift(data) }
    )
  }

  render () {
    if (!this.props.user ||
      !this.props.schedules ||
      !this.props.positions ||
      !this.props.comments ||
      !this.props.locations) {
      return (
        <Preloader/>
      )
    }
    return (
      <div className="container">
        <header className="header">
          <Link to={routes.home.href} className="header__title">{routes.home.name}</Link>
        </header>
        <Switch>
          <Route exact path={routes.home.href} component={Home}/>
          <Route exact path={routes.employees.href} component={Employees}/>
          <Route exact path={routes.employeesList.href} component={EmployeeList}/>
          <Route exact path={routes.vacancies.href} component={Vacancies}/>
          <Route exact path={routes.comments.href} component={Comments}/>
          <Route exact path={routes.commentsHistory.href} component={ShiftsHistory}/>
          <Route exact path={routes.addNewComments.href} component={CreateNewComments}/>
          <Route exact path={routes.updateComment.href + ':commentId'} component={CreateNewComments}/>
          <Route exact path={routes.tasks.href} component={Tasks}/>
          <Route exact path={routes.tasks.hotelTasks.href} component={TasksForHotel}/>
          <Route exact path={routes.tasks.kitchenTasks.href} component={TasksForKitchen}/>
          <Route exact path={routes.tasks.firstRestaurantTasks.href} component={TasksForFirstRestaurant}/>
          <Route exact path={routes.tasks.secondRestaurantTasks.href} component={TasksForSecondRestaurant}/>
          <Route exact path={routes.tasks.cyclicTasks.href} component={TasksOfCyclic}/>
          <Route exact path={routes.tasks.myTasks.href} component={MyTasks}/>
          <Route exact path={routes.washingData.href} component={WashingData}/>
          <Route exact path={routes.washingData.salesNumbers.href} component={SalesNumbers}/>
          <Route exact path={routes.washingData.lodgers.href} component={Lodgers}/>
        </Switch>
      </div>
    )
  }
}

const mapStateToProps = ({comments, startData}) => {
  return {
    user: startData.currentUser,
    positions: startData.positions,
    schedules: startData.schedules,
    comments: comments.lastComments,
    locations: startData.locations
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    addUser: (data) => {
      dispatch(addCurrentUser(data))
    },
    addAllPositions: (data) => {
      dispatch(addAllPositions(data))
    },
    addSchedules: (data) => {
      dispatch(addAllSchedules(data))
    },
    addAllLocation: (data) => {
      dispatch(addAllLocation(data))
    },
    addShift: (data) => {
      dispatch(addShift(data))
    }
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App))
