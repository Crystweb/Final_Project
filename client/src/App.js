import React, { Component } from 'react'
import './styles/App.css'
import Home from './pages/Home'
import { Link, Route, Switch } from 'react-router-dom'
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
import ShiftHistoryForSelectedDay from './pages/shifts/ShiftsHistoryForSelectedDay'
import ShiftHistoryAdmin from './pages/shifts/ShiftHistoryAdmin'
import ShiftHistoryManager from './pages/shifts/ShiftHistoryManager'

class App extends Component {
  render () {
    return (
      <div className="container">
        <header className="header">
          <Link to={routes.home.href} className="header__title">{routes.home.name}</Link>
        </header>
        <Switch>
          <Route exact path={routes.home.href} component={Home}/>
          <Route exact path={routes.employees.href} component={Employees}/>
          <Route exact path={routes.employeeList.href} component={EmployeeList}/>
          <Route exact path={routes.vacancies.href} component={Vacancies}/>
          <Route exact path={routes.comments.href} component={Comments}/>
          <Route exact path={routes.commentsHistory.href} component={ShiftsHistory}/>
          <Route exact path={routes.addNewComments.href} component={CreateNewComments}/>
          <Route exact path={routes.shiftsHistoryForSelectedDay.href} component={ShiftHistoryForSelectedDay}/>
          <Route exact path={routes.shiftsHistoryForSelectedDay.href} component={ShiftHistoryForSelectedDay}/>
          <Route exact path={routes.shiftHistoryAdmin.href} component={ShiftHistoryAdmin}/>
          <Route exact path={routes.shiftHistoryManager.href} component={ShiftHistoryManager}/>
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

export default App
